from fastapi.responses import JSONResponse
from db.connect import get_cursor

async def create_drive(user_id: int, body):
    try:
        allowed_branches_csv = ",".join(body.allowed_branches)

        with get_cursor() as cur:
            cur.execute("""
                INSERT INTO company_drives (
                    company_name, role, ctc, job_location, 
                    drive_date, registration_deadline, rounds_info,
                    min_cgpa, allowed_branches, min_year, max_backlogs,
                    min_tenth_percent, min_twelfth_percent,
                    created_by, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
            """, (
                body.company_name, body.role, body.ctc, body.job_location,
                body.drive_date, body.registration_deadline, body.rounds_info,
                body.min_cgpa, allowed_branches_csv, body.min_year, body.max_backlogs,
                body.min_tenth_percent, body.min_twelfth_percent,
                user_id
            ))

        return JSONResponse(status_code=201, content={"message": "Drive created successfully"})

    except Exception as e:
        print("Drive Create Error:", e)
        return JSONResponse(status_code=500, content={"message": "Unexpected error"})

async def update_drive(drive_id: int, body):
    try:
        allowed_branches_csv = ",".join(body.allowed_branches)

        with get_cursor() as cur:
            cur.execute("""
                UPDATE company_drives SET
                    company_name=?, role=?, ctc=?, job_location=?,
                    drive_date=?, registration_deadline=?, rounds_info=?,
                    min_cgpa=?, allowed_branches=?, min_year=?, max_backlogs=?,
                    min_tenth_percent=?, min_twelfth_percent=?
                WHERE id=?
            """, (
                body.company_name, body.role, body.ctc, body.job_location,
                body.drive_date, body.registration_deadline, body.rounds_info,
                body.min_cgpa, allowed_branches_csv, body.min_year, body.max_backlogs,
                body.min_tenth_percent, body.min_twelfth_percent, drive_id
            ))

        return JSONResponse(status_code=200, content={"message": "Drive updated successfully"})

    except Exception as e:
        print("Drive Update Error:", e)
        return JSONResponse(status_code=500, content={"message": "Unexpected error"})

async def list_drives():
    try:
        with get_cursor() as cur:
            cur.execute("SELECT * FROM company_drives ORDER BY drive_date ASC")
            drives = cur.fetchall()

        return drives

    except Exception as e:
        print("List Drives Error:", e)
        return []

async def get_drive(drive_id: int):
    try:
        with get_cursor() as cur:
            cur.execute("SELECT * FROM company_drives WHERE id=?", (drive_id,))
            drive = cur.fetchone()

        return drive

    except Exception as e:
        print("Get Drive Error:", e)
        return None
