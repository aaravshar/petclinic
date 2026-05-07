from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class UserBase(SQLModel):
    browser_id: str = Field(index=True)
    nickname: str = Field(default="")
    role: str = Field(default="owner")


class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class UserRead(UserBase):
    id: int
    created_at: datetime


class UserSync(SQLModel):
    browser_id: str
    nickname: str = ""
    role: str = "owner"
