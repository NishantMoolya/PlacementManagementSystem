from fastapi.responses import JSONResponse
from db.connect import get_cursor

async def create_or_update_tpo_profile(user_id: int, data):
    try:
        with get_cursor() as cur:
            cur.execute("SELECT id FROM tpos WHERE id = ?", (user_id,))
            exists = cur.fetchone()

            if exists:
                cur.execute("""
                    UPDATE tpos SET
                        designation=?, phone=?, department=?, updated_at=datetime('now')
                    WHERE id = ?
                """, (data.designation, data.phone, data.department, user_id))

                return JSONResponse(status_code=200, content={"message": "TPO profile updated"})

            else:
                cur.execute("""
                    INSERT INTO tpos (
                        id, designation, phone, department, created_at, updated_at
                    ) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
                """, (
                    user_id, data.designation, data.phone, data.department
                ))

                return JSONResponse(status_code=201, content={"message": "TPO profile created"})

    except Exception as e:
        print("TPO Profile Error:", e)
        return JSONResponse(status_code=500, content={"message": "Unexpected error"})
