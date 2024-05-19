import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from databases import Database


DATABASE_URL = os.environ.get("DATABASE_URL")

if not DATABASE_URL:
    # DATABASE_URL='postgresql://postgres:postgres@db:5432/documents_db'
    raise ValueError("DATABASE_URL environment variable not set")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

database = Database(DATABASE_URL)


# Database Seeding
async def init_db():
  async with database.transaction(): # Start Transaction for database
    table_exists = await database.fetch_one(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'documents')"
    )
    if not table_exists[0]: 
      print("Creating table documents...")
      await database.execute(
          """CREATE TABLE documents (
              id SERIAL PRIMARY KEY,
              type TEXT NOT NULL,
              title TEXT NOT NULL,
              position INTEGER NOT NULL
          );"""
        )
    else:
      print("Table documents already exists.")
    # Check if table has records, if not then add sample data
    document_count = await database.fetch_val("SELECT COUNT(*) FROM documents")
    if document_count == 0:
      print("No documents found, seeding database...")
      sample_data = [
        {"type": "bankdraft", "title": "Bank Draft", "position": 0},
        {"type": "bill-of-lading", "title": "Bill of Lading", "position": 1},
        {"type": "invoice", "title": "Invoice", "position": 2},
        {"type": "bank-draft-2", "title": "Bank Draft 2", "position": 3},
        {"type": "bill-of-lading-2", "title": "Bill of Lading 2", "position": 4}
      ]
      query = "INSERT INTO documents(type, title, position) VALUES (:type, :title, :position)"
      values = [{
        "type": doc["type"], 
        "title": doc["title"], 
        "position": doc["position"]
      } for doc in sample_data]
      await database.execute_many(query=query, values=values)
    else:
      print("Documents already exist, skipping seeding.")