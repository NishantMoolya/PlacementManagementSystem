from fastapi.responses import JSONResponse
from db.connect import get_cursor
from utils.eligibility import check_eligibility

async def register_for_drive(request, drive_id: int):

    # role check
    if request.state.role != "student":
        return JSONResponse(status_code=403, content={"message": "Only students can register"})

    student_id = request.state.user_id

    try:
        with get_cursor() as cur:
            
            # Fetch student profile
            cur.execute("SELECT * FROM students WHERE id = ?", (student_id,))
            student = cur.fetchone()
            if not student:
                return JSONResponse(status_code=404, content={"message": "Student profile not found"})

            # Fetch drive details
            cur.execute("SELECT * FROM company_drives WHERE id = ?", (drive_id,))
            drive = cur.fetchone()
            if not drive:
                return JSONResponse(status_code=404, content={"message": "Drive not found"})

            # Check eligibility
            issues = check_eligibility(student, drive)
            if len(issues) > 0:
                return JSONResponse(
                    status_code=400,
                    content={"eligible": False, "reasons": issues}
                )

            # Already registered?
            cur.execute("""
                SELECT id FROM drive_registrations
                WHERE drive_id = ? AND student_id = ?
            """, (drive_id, student_id))
            if cur.fetchone():
                return JSONResponse(status_code=400, content={"message": "Already registered"})

            # Register student
            cur.execute("""
                INSERT INTO drive_registrations (drive_id, student_id, registration_date)
                VALUES (?, ?, datetime('now'))
            """, (drive_id, student_id))

        return {"message": "Registration successful", "eligible": True}

    except Exception as e:
        print("Registration error:", e)
        return JSONResponse(status_code=500, content={"message": "Unexpected error"})

async def get_drive_attendance(role: str, drive_id: int):

    if role != "tpo":
        return JSONResponse(status_code=403, content={"message": "Only TPO allowed"})

    with get_cursor() as cur:
        cur.execute("""
            SELECT 
                s.id AS student_id,
                s.usn,
                u.name AS student_name,
                dr.status AS registration_status,
                da.attended,
                da.shortlist_status
            FROM drive_registrations dr
            LEFT JOIN students s 
                ON dr.student_id = s.id
            LEFT JOIN users u
                ON s.id = u.id
            LEFT JOIN drive_attendance da 
                ON dr.student_id = da.student_id 
                AND dr.drive_id = da.drive_id
            WHERE dr.drive_id = ?
        """, (drive_id,))

        return {"data": [dict(row) for row in cur.fetchall()]}


async def mark_attendance(request, drive_id: int, student_id: int, attended: bool):

    if request.state.role != "tpo":
        return JSONResponse(status_code=403, content={"message": "Only TPO allowed"})

    with get_cursor() as cur:
        cur.execute("""
            INSERT INTO drive_attendance (drive_id, student_id, attended, updated_at)
            VALUES (?, ?, ?, datetime('now'))
            ON CONFLICT(drive_id, student_id)
            DO UPDATE SET attended=excluded.attended
        """, (drive_id, student_id, attended))

    return {"message": "Attendance updated"}

async def update_shortlist(request, drive_id, student_id, status: str):

    if request.state.role != "tpo":
        return JSONResponse(status_code=403, content={"message": "Only TPO allowed"})

    with get_cursor() as cur:
        cur.execute("""
            UPDATE drive_attendance
            SET shortlist_status = ?, updated_at = datetime('now')
            WHERE drive_id = ? AND student_id = ?
        """, (status, drive_id, student_id))

    return {"message": "Shortlist updated"}
