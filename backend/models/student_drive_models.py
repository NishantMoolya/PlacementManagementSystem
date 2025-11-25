from pydantic import BaseModel

# ---------- Attendance Update ----------
class AttendanceUpdate(BaseModel):
    attended: int  # 0 or 1

# ---------- Shortlist Update ----------
class ShortlistUpdate(BaseModel):
    status: str  # pending / shortlisted / rejected
