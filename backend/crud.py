from sqlalchemy.orm import Session
from models import Document
from schemas import DocumentIn
from typing import List

def get_documents(db: Session):
    return db.query(Document).order_by(Document.position).all() 

def add_document(db: Session, document: DocumentIn):
    db_document = Document(**document.dict())
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def update_document_positions(db: Session, documents: List[dict]):
    for doc_data in documents:
        db_document = db.query(Document).filter_by(id=doc_data["id"]).first()
        if db_document:
            db_document.position = doc_data["position"]
            db.add(db_document)
    db.commit()
