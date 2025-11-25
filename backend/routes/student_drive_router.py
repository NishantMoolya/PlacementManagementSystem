from fastapi import APIRouter, Request
from models.student_drive_models import AttendanceUpdate, ShortlistUpdate
from controllers.student_drive_controller import register_for_drive, get_drive_attendance, mark_attendance, update_shortlist

student_drive_router = APIRouter()

# -------- Student Register for Drive --------
@student_drive_router.post("/{drive_id}/register")
async def register_drive(request: Request, drive_id: int):
    return await register_for_drive(request, drive_id)

# -------- Get Attendance List (TPO) --------
@student_drive_router.get("/{drive_id}/attendance")
async def attendance_list(request: Request, drive_id: int):
    role = request.state.role
    return await get_drive_attendance(role, drive_id)

# -------- Mark Attendance (TPO) --------
@student_drive_router.post("/{drive_id}/attendance/{student_id}")
async def mark_drive_attendance(
    request: Request, 
    drive_id: int, 
    student_id: int, 
    payload: AttendanceUpdate
):
    return await mark_attendance(request, drive_id, student_id, payload.attended)

# -------- Update Shortlist (TPO) --------
@student_drive_router.post("/{drive_id}/shortlist/{student_id}")
async def shortlist_student(
    request: Request, 
    drive_id: int, 
    student_id: int, 
    payload: ShortlistUpdate
):
    return await update_shortlist(request, drive_id, student_id, payload.status)
