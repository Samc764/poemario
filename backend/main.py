from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, auth
from .database import engine, get_db
from typing import List

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Poemario API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/api/register', response_model=schemas.UserOut)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    if user_in.email:
        existing = db.query(models.User).filter((models.User.username == user_in.username) | (models.User.email == user_in.email)).first()
    else:
        existing = db.query(models.User).filter(models.User.username == user_in.username).first()
    if existing:
        raise HTTPException(status_code=400, detail='User with that username or email already exists')
    email_value = user_in.email or f"{user_in.username}@poemario.local"
    user = models.User(
        username=user_in.username,
        email=email_value,
        hashed_password=auth.get_password_hash(user_in.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.post('/api/login', response_model=schemas.Token)
def login(form_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        (models.User.username == form_data.username) | (models.User.email == form_data.username)
    ).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail='Incorrect username or password')
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get('/api/poems', response_model=List[schemas.PoemOut])
def list_poems(db: Session = Depends(get_db)):
    poems = db.query(models.Poem).order_by(models.Poem.created_at.desc()).all()
    return poems


@app.post('/api/poems', response_model=schemas.PoemOut)
def create_poem(p: schemas.PoemCreate, current_user=Depends(auth.get_current_user), db: Session = Depends(get_db)):
    poem = models.Poem(title=p.title, author=p.author, text=p.text, owner_id=current_user.id)
    db.add(poem)
    db.commit()
    db.refresh(poem)
    return poem


@app.get('/api/images', response_model=List[schemas.ImageOut])
def list_images(db: Session = Depends(get_db)):
    imgs = db.query(models.Image).order_by(models.Image.created_at.desc()).all()
    return imgs


@app.post('/api/images', response_model=schemas.ImageOut)
def create_image(i: schemas.ImageCreate, current_user=Depends(auth.get_current_user), db: Session = Depends(get_db)):
    img = models.Image(title=i.title, url=i.url, description=i.description, owner_id=current_user.id)
    db.add(img)
    db.commit()
    db.refresh(img)
    return img
