from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user_routes import user_router
from routes.student_router import student_router
from routes.tpo_router import tpo_router
from routes.drives_router import drives_router
from routes.student_drive_router import student_drive_router
from middlewares.auth_middleware import AuthMiddleware
from utils.custom_openapi import add_jwt_auth_to_openapi
from db.models.tables import create_tables
from core.config import settings

create_tables()

app = FastAPI(redoc_url=None, docs_url=None if settings.ENV == "PROD" else "/docs")

add_jwt_auth_to_openapi(app)

@app.get('/')
async def handleHome():
    return "Hello Client, I am healthy"

origins = [
    "http://localhost:5173",
]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Update with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom middleware for user auth
app.add_middleware(AuthMiddleware)

# Include the routers
app.include_router(user_router, prefix="/api/v1/user", tags=["User Authentication"])
app.include_router(student_router, prefix="/api/v1/user", tags=["Students"])
app.include_router(tpo_router, prefix="/api/v1/user", tags=["TPOs"])
app.include_router(drives_router, prefix="/api/v1/drives", tags=["Drives"])
app.include_router(student_drive_router, prefix="/api/v1/drive-management", tags=["Drives Management"])
