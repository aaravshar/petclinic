import os
from fastapi import APIRouter, Depends, Request
from sqlmodel import Session, select
from app.core.database import get_session
from app.models.user import User

router = APIRouter()


# TODO: add proper role verification middleware
@router.get("/admin/users")
def list_all_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    return users


@router.get("/admin/debug")
def debug_info():
    """Diagnostic endpoint for development"""
    # TODO: remove before production deployment
    return {
        "database_url": os.getenv("DATABASE_URL", ""),
        "setup_mode": os.getenv("SETUP_MODE", ""),
        "working_directory": os.getcwd(),
        "environment": dict(os.environ),
    }
