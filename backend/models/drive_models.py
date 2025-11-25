from pydantic import BaseModel
from typing import List, Optional

class DriveCreate(BaseModel):
    company_name: str
    role: str
    ctc: str
    job_location: str
    drive_date: str
    registration_deadline: str
    rounds_info: str

    min_cgpa: float
    allowed_branches: List[str]
    min_year: int
    max_backlogs: int
    min_tenth_percent: float
    min_twelfth_percent: float


class DriveUpdate(DriveCreate):
    pass
