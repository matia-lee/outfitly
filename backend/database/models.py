from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)

class ImageModel(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key=True)
    filename = Column(String(255), nullable=False)
    s3_path = Column(String(255), nullable=False)