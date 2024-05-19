import contextlib
import uvicorn

from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.status import HTTP_200_OK


from crud import get_documents, add_document, update_document_positions
from database import database, SessionLocal, init_db
from schemas import DocumentIn, DocumentUpdate


@contextlib.asynccontextmanager
async def lifespan(app):
    await database.connect()
    await init_db()
    yield
    await database.disconnect()

async def get_all_documents(request):
    db = SessionLocal()
    documents = get_documents(db)
    db.close()
    print(":: get_all_documents ::", [document.columnitems for document in documents])
    return JSONResponse([document.columnitems for document in documents])


async def create_document(request):
    data = await request.json()
    db = SessionLocal()
    db_document = add_document(db, DocumentIn(**data))
    db.close()
    return JSONResponse(db_document.columnitems)

async def update_positions(request):
    data = await request.json()
    document_data = DocumentUpdate(**data)

    db = SessionLocal()
    update_document_positions(db, document_data.documents)
    db.close()
    
    return JSONResponse({"message": "Positions updated successfully"}, status_code=HTTP_200_OK)



async def homepage(request):
    return JSONResponse({'hello': 'world'})

routes=[
    Route('/', homepage),
    Route('/documents', get_all_documents, methods=['GET']),
    Route('/documents', create_document, methods=['POST']),
    Route('/documents/update', update_positions, methods=['POST'])

]

middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'], expose_headers=['*'])
]
app = Starlette(debug=True, routes=routes, middleware=middleware, lifespan=lifespan)


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8080, reload=True)