from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base as real_declarative_base
 
# Let's make this a class decorator
declarative_base = lambda cls: real_declarative_base(cls=cls)
 
@declarative_base
class Base(object):
    """
    Add some default properties and methods to the SQLAlchemy declarative base.
    """
 
    @property
    def columns(self):
        return [ c.name for c in self.__table__.columns ]
 
    @property
    def columnitems(self):
        return dict([ (c, getattr(self, c)) for c in self.columns ])
 
    def __repr__(self):
        return '{}({})'.format(self.__class__.__name__, self.columnitems)
 
    def tojson(self):
        return self.columnitems


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    position = Column(Integer, nullable=False)

    def as_dict(self):
       return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}
