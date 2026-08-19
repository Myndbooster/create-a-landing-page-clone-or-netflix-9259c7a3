from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from typing import List
import os
from passlib.context import CryptContext
import jwt

app = FastAPI()

# Database mock (to be replaced with real DB logic)
users_db = {}
movies_db = {1: {'title': 'Movie 1', 'description': 'Description for movie 1'},
             2: {'title': 'Movie 2', 'description': 'Description for movie 2'},
             3: {'title': 'Movie 3', 'description': 'Description for movie 3'}}

# Security schemes
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/signin")

class User(BaseModel):
    email: EmailStr
    password: str

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    token: str

class SignUpResponse(BaseModel):
    success: bool
    message: str

class MovieDetailResponse(BaseModel):
    title: str
    description: str

class SearchResult(BaseModel):
    id: int
    title: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_jwt_token(data):
    return jwt.encode(data, os.environ['JWT_SECRET'], algorithm="HS256")

@app.post('/api/signin', response_model=Token)
async def signin(form_data: OAuth2PasswordRequestForm=Depends()):
    user = users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user['hashed_password']):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token_data = {"sub": form_data.username}
    token = create_jwt_token(token_data)
    return Token(token=token)

@app.post('/api/signup', response_model=SignUpResponse)
async def signup(user: User):
    if user.email in users_db:
        return SignUpResponse(success=False, message="Email already registered")
    users_db[user.email] = {
        'email': user.email,
        'hashed_password': get_password_hash(user.password)
    }
    return SignUpResponse(success=True, message="User registered successfully")

@app.get('/api/movies/{id}', response_model=MovieDetailResponse)
async def get_movie_details(id: int):
    if id not in movies_db:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movies_db[id]

@app.get('/api/search', response_model=List[SearchResult])
async def search_movies(query: str):
    results = [{"id": id, "title": movie['title']} for id, movie in movies_db.items() if query.lower() in movie['title'].lower()]
    return results
