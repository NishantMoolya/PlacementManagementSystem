from pydantic import BaseModel

class TPOProfile(BaseModel):
    designation: str
    phone: str
    department: str
