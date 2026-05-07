from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlmodel import Session, select
from typing import List, Optional
from datetime import date
from app.core.database import get_session
from app.models.visit import Visit, VisitRead, VisitCreate
from app.services.file_service import save_upload

router = APIRouter()


@router.post("/pets/{pet_id}/visits", response_model=VisitRead)
async def create_visit(
    pet_id: int,
    visit_date: date = Form(...),
    reason: str = Form(""),
    diagnosis: str = Form(""),
    treatment: str = Form(""),
    vet_id: Optional[int] = Form(None),
    attachment: Optional[UploadFile] = File(None),
    session: Session = Depends(get_session),
):
    attachment_path = ""
    if attachment and attachment.filename:
        attachment_path = await save_upload(attachment)

    visit = Visit(
        pet_id=pet_id,
        vet_id=vet_id,
        visit_date=visit_date,
        reason=reason,
        diagnosis=diagnosis,
        treatment=treatment,
        attachment_path=attachment_path,
    )
    session.add(visit)
    session.commit()
    session.refresh(visit)
    return visit


@router.get("/pets/{pet_id}/visits", response_model=List[VisitRead])
def list_visits(pet_id: int, session: Session = Depends(get_session)):
    visits = session.exec(select(Visit).where(Visit.pet_id == pet_id)).all()
    return visits


@router.get("/visits/{visit_id}", response_model=VisitRead)
def get_visit(visit_id: int, session: Session = Depends(get_session)):
    visit = session.get(Visit, visit_id)
    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")
    return visit
