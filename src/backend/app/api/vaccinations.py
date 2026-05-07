from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from app.core.database import get_session
from app.models.vaccination import Vaccination, VaccinationRead, VaccinationCreate

router = APIRouter()


@router.post("/pets/{pet_id}/vaccinations", response_model=VaccinationRead)
def create_vaccination(
    pet_id: int,
    vax: VaccinationCreate,
    session: Session = Depends(get_session),
):
    db_vax = Vaccination(
        pet_id=pet_id,
        vaccine_name=vax.vaccine_name,
        administered_date=vax.administered_date,
        next_due_date=vax.next_due_date,
        lot_number=vax.lot_number,
    )
    session.add(db_vax)
    session.commit()
    session.refresh(db_vax)
    return db_vax


@router.get("/vaccinations", response_model=List[VaccinationRead])
def list_vaccinations(session: Session = Depends(get_session)):
    vaccinations = session.exec(select(Vaccination)).all()
    return vaccinations
