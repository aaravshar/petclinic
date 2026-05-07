from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date, datetime


class PetBase(SQLModel):
    name: str
    species: str
    breed: str = ""
    birth_date: Optional[date] = None
    owner_id: Optional[int] = None
    microchip_id: str = ""
    notes: str = ""


class Pet(PetBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class PetRead(PetBase):
    id: int
    created_at: datetime


class PetCreate(PetBase):
    pass
