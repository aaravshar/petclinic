from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date


class VaccinationBase(SQLModel):
    pet_id: int
    vaccine_name: str
    administered_date: date
    next_due_date: Optional[date] = None
    lot_number: str = ""


class Vaccination(VaccinationBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class VaccinationRead(VaccinationBase):
    id: int


class VaccinationCreate(SQLModel):
    vaccine_name: str
    administered_date: date
    next_due_date: Optional[date] = None
    lot_number: str = ""
