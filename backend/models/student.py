from pydantic import BaseModel

class StudentProfile(BaseModel):
    usn: str
    branch: str
    year: int
    cgpa: float
    backlogs: int
    tenth_percent: float
    twelfth_percent: float
