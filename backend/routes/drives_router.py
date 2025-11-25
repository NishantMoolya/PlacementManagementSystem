from fastapi import APIRouter, Request
from models.drive_models import DriveCreate, DriveUpdate
from controllers.drives_controller import create_drive, update_drive, list_drives, get_drive

drives_router = APIRouter()

# CREATE
@drives_router.post("/")
async def create_drive_route(request: Request, body: DriveCreate):
    if request.state.role != "tpo":
        return {"message": "Only TPOs can create drives", "status": False}
    
    user_id = request.state.user_id
    return await create_drive(user_id, body)


# UPDATE
@drives_router.put("/{drive_id}")
async def update_drive_route(drive_id: int, request: Request, body: DriveUpdate):
    if request.state.role != "tpo":
        return {"message": "Only TPOs can update drives", "status": False}
    
    return await update_drive(drive_id, body)


# LIST ALL
@drives_router.get("/")
async def list_all_drives():
    drives = await list_drives()
    return {"data": drives}


# GET SINGLE
@drives_router.get("/{drive_id}")
async def get_single_drive(drive_id: int):
    drive = await get_drive(drive_id)
    return {"data": drive}
