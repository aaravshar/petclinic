from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date, datetime


class VisitBase(SQLModel):
    pet_id: int
    vet_id: Optional[int] = None
    visit_date: date
    reason: str = ""
    diagnosis: str = ""
    treatment: str = ""
    attachment_path: str = ""


class Visit(VisitBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class VisitRead(VisitBase):
    id: int
    created_at: datetime


class VisitCreate(SQLModel):
    vet_id: Optional[int] = None
    visit_date: date
    reason: str = ""
    diagnosis: str = ""
    treatment: str = ""
