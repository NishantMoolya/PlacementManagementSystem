from pydantic import BaseModel

class DecodedToken(BaseModel):
    status: bool
    data: int
    role: str
    message: str
