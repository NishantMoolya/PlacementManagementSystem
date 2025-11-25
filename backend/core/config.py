from pydantic_settings import BaseSettings
from typing import Literal

class Settings(BaseSettings):
    JWT_SECRET_KEY: str
    JWT_EXPIRE_TIME: int
    JWT_TOKEN_NAME: str
    ENV: Literal["DEV", "PROD"]

    class Config:
        env_file = ".env"
        

settings = Settings()
