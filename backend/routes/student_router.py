from fastapi import APIRouter, Request
from models.student import StudentProfile
from controllers.student_controller import create_or_update_student_profile

student_router = APIRouter()

@student_router.post("/student/profile")
async def create_profile(request: Request, body: StudentProfile):
    user_id = request.state.user_id
    return await create_or_update_student_profile(user_id, body)
