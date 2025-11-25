from fastapi import APIRouter, Request
from models.user_auth import UserSignup, UserLogin
from controllers.user_controller import user_signup, user_login, user_profile

user_router = APIRouter()

@user_router.post("/signup")
async def signup_route(user: UserSignup):
    return await user_signup(user)

@user_router.post("/login")
async def login_route(user: UserLogin):
    return await user_login(user)

@user_router.get("/profile")
async def profile_route(request: Request):
    user_id = request.state.user_id
    return await user_profile(user_id)
