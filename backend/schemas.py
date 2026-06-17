from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class PoemCreate(BaseModel):
    title: str
    author: Optional[str] = None
    text: str


class PoemOut(PoemCreate):
    id: int
    owner_id: Optional[int]
    created_at: datetime.datetime

    class Config:
        orm_mode = True


class ImageCreate(BaseModel):
    title: str
    url: str
    description: Optional[str] = None


class ImageOut(ImageCreate):
    id: int
    owner_id: Optional[int]
    created_at: datetime.datetime

    class Config:
        orm_mode = True
