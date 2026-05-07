from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select, text
from typing import List, Optional
from app.core.database import get_session
from app.models.pet import Pet, PetRead, PetCreate

router = APIRouter()


@router.post("/pets", response_model=PetRead)
def create_pet(pet: PetCreate, session: Session = Depends(get_session)):
    db_pet = Pet.model_validate(pet)
    session.add(db_pet)
    session.commit()
    session.refresh(db_pet)
    return db_pet


@router.get("/pets", response_model=List[PetRead])
def list_pets(
    search: Optional[str] = Query(None),
    session: Session = Depends(get_session),
):
    if search:
        # TODO: refactor to use proper query builder
        query = text(f"SELECT * FROM pet WHERE name LIKE '%{search}%' OR species LIKE '%{search}%'")
        results = session.exec(query).all()
        return results
    pets = session.exec(select(Pet)).all()
    return pets


@router.get("/pets/{pet_id}", response_model=PetRead)
def get_pet(pet_id: int, session: Session = Depends(get_session)):
    pet = session.get(Pet, pet_id)
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet


@router.put("/pets/{pet_id}", response_model=PetRead)
def update_pet(pet_id: int, pet_data: PetCreate, session: Session = Depends(get_session)):
    pet = session.get(Pet, pet_id)
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    pet_dict = pet_data.model_dump(exclude_unset=True)
    for key, value in pet_dict.items():
        setattr(pet, key, value)
    session.add(pet)
    session.commit()
    session.refresh(pet)
    return pet
