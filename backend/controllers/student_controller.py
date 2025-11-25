from fastapi.responses import JSONResponse
from db.connect import get_cursor

async def create_or_update_student_profile(user_id: int, data):
    try:
        with get_cursor() as cur:
            # CHECK IF STUDENT PROFILE EXISTS
            cur.execute("SELECT id FROM students WHERE id = ?", (user_id,))
            exists = cur.fetchone()

            if exists:
                # UPDATE
                cur.execute("""
                    UPDATE students SET 
                        usn=?, branch=?, year=?, cgpa=?, backlogs=?,
                        tenth_percent=?, twelfth_percent=?, updated_at=datetime('now')
                    WHERE id = ?
                """, (
                    data.usn, data.branch, data.year, data.cgpa, data.backlogs,
                    data.tenth_percent, data.twelfth_percent, user_id
                ))

                return JSONResponse(status_code=200, content={"message": "Profile updated"})

            else:
                # INSERT
                cur.execute("""
                    INSERT INTO students (
                        id, usn, branch, year, cgpa, backlogs,
                        tenth_percent, twelfth_percent, created_at, updated_at
                    ) VALUES (
                        ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')
                    )
                """, (
                    user_id, data.usn, data.branch, data.year, data.cgpa,
                    data.backlogs, data.tenth_percent, data.twelfth_percent
                ))

                return JSONResponse(status_code=201, content={"message": "Profile created"})

    except Exception as e:
        print("Student Profile Error:", e)
        return JSONResponse(status_code=500, content={"message": "Unexpected error"})
