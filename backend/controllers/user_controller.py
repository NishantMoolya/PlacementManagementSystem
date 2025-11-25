from fastapi.responses import JSONResponse
from models.user_auth import UserSignup, UserLogin
from db.connect import get_cursor
from utils.user_auth import get_password_hash, verify_password, create_access_token
from datetime import datetime

# USERS TABLE COLUMNS:
# id, name, email, password_hash, role, created_at


async def user_signup(user: UserSignup):
    try:
        # 1️⃣ CHECK IF EMAIL EXISTS
        with get_cursor() as cur:
            cur.execute("SELECT id FROM users WHERE email = ?", (user.email,))
            exists = cur.fetchone()

            if exists:
                return JSONResponse(
                    status_code=400, 
                    content={"message": "Email already registered"}
                )

        # 2️⃣ HASH PASSWORD
        hashed_password = get_password_hash(user.password)

        # 3️⃣ INSERT INTO USERS TABLE
        created_at = datetime.utcnow().isoformat()

        with get_cursor() as cur:
            cur.execute("""
                INSERT INTO users (name, email, password_hash, role, created_at)
                VALUES (?, ?, ?, ?, ?)
            """, (user.username, user.email, hashed_password, user.role, created_at))

            user_id = cur.lastrowid

        # RESPONSE
        return JSONResponse(
            status_code=201,
            content={
                "message": "User created successfully",
                "data": {
                    "id": user_id,
                    "name": user.username,
                    "email": user.email,
                    "role": user.role
                }
            }
        )

    except Exception as e:
        print("Signup error:", e)
        return JSONResponse(status_code=500, content={"message": "Unexpected error"})


async def user_login(user: UserLogin):
    try:
        # 1️⃣ GET USER BY EMAIL
        with get_cursor() as cur:
            cur.execute("""
                SELECT id, name, email, password_hash, role 
                FROM users 
                WHERE email = ?
            """, (user.email,))
            db_user = cur.fetchone()

        if not db_user:
            return JSONResponse(status_code=401, content={"message": "Invalid email or password"})

        # 2️⃣ VERIFY PASSWORD
        if not verify_password(user.password, db_user["password_hash"]):
            return JSONResponse(status_code=401, content={"message": "Invalid email or password"})

        # 3️⃣ CREATE TOKEN
        token = create_access_token(user_id=db_user["id"], role=db_user["role"])

        return JSONResponse(
            status_code=200,
            content={
                "message": "Login successful",
                "data": {
                    "id": db_user["id"],
                    "name": db_user["name"],
                    "email": db_user["email"],
                    "role": db_user["role"]
                },
                "token": token
            }
        )

    except Exception as e:
        print("Login error:", e)
        return JSONResponse(status_code=500, content={"message": "Unexpected error"})


async def user_profile(user_id: int):
    try:
        # 1️⃣ GET BASE USER
        with get_cursor() as cur:
            cur.execute("""
                SELECT id, name, email, role, created_at
                FROM users
                WHERE id = ?
            """, (user_id,))
            user = cur.fetchone()

        if not user:
            return JSONResponse(
                status_code=404,
                content={"message": "User not found", "auth": False}
            )

        role = user["role"]
        profile_data = {}

        # 2️⃣ FETCH STUDENT PROFILE
        if role == "student":
            with get_cursor() as cur:
                cur.execute("""
                    SELECT usn, branch, year, cgpa, backlogs,
                           tenth_percent, twelfth_percent, updated_at
                    FROM students
                    WHERE id = ?
                """, (user_id,))
                student = cur.fetchone()

            if student:
                profile_data = {
                    "usn": student["usn"],
                    "branch": student["branch"],
                    "year": student["year"],
                    "cgpa": student["cgpa"],
                    "backlogs": student["backlogs"],
                    "tenth_percent": student["tenth_percent"],
                    "twelfth_percent": student["twelfth_percent"],
                    "updated_at": student["updated_at"]
                }

        # 3️⃣ FETCH TPO PROFILE
        elif role == "tpo":
            with get_cursor() as cur:
                cur.execute("""
                    SELECT designation, phone, department, updated_at
                    FROM tpos
                    WHERE id = ?
                """, (user_id,))
                tpo = cur.fetchone()

            if tpo:
                profile_data = {
                    "designation": tpo["designation"],
                    "phone": tpo["phone"],
                    "department": tpo["department"],
                    "updated_at": tpo["updated_at"]
                }

        # 4️⃣ ADMINS → Only base data, no profile table

        # 5️⃣ FINAL RESPONSE
        return JSONResponse(
            status_code=200,
            content={
                "message": "Profile fetched successfully",
                "data": {
                    "id": user["id"],
                    "name": user["name"],
                    "email": user["email"],
                    "role": user["role"],
                    "auth": True,
                    "profile": profile_data
                }
            }
        )

    except Exception as e:
        print("Profile error:", e)
        return JSONResponse(
            status_code=500,
            content={"message": "Unexpected error", "auth": False}
        )
