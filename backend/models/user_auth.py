from pydantic import BaseModel, EmailStr
from typing import Literal

class UserSignup(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: Literal["student", "tpo"]

class UserLogin(BaseModel):
    email: EmailStr
    password: str