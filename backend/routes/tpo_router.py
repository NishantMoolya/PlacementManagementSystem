from fastapi import APIRouter, Request
from models.tpo import TPOProfile
from controllers.tpo_controller import create_or_update_tpo_profile

tpo_router = APIRouter()

@tpo_router.post("/tpo/profile")
async def create_tpo_profile(request: Request, body: TPOProfile):
    user_id = request.state.user_id
    return await create_or_update_tpo_profile(user_id, body)

