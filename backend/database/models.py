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
    username = Column(String(80), nullable=False)
    file_url = Column(String(255), nullable=False)
    interaction = Column(String(80), nullable=False)
    like = Column(String(80), nullable=True)

class Outfits(Base):
    __tablename__ ='fits'
    outfit_id = Column(Integer, primary_key=True)
    username = Column(String(80), nullable=False)
    headwear = Column(String(255), nullable=True)
    top = Column(String(255), nullable=True)
    bottom = Column(String(255), nullable=True)
    footwear = Column(String(255), nullable=True)
    fit_name = Column(String(255), nullable=True)