from pydantic import BaseModel, Field
from typing import List, Union

class DocumentIn(BaseModel):
    type: str = Field(..., max_length=50)
    title: str = Field(..., max_length=100)
    position: int


class DocumentUpdate(BaseModel):
    documents: List[dict] = Field(...)
