from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.core.database import get_session
from app.models.user import User, UserRead, UserSync

router = APIRouter()


@router.post("/users/sync", response_model=UserRead)
def sync_user(user_data: UserSync, session: Session = Depends(get_session)):
    statement = select(User).where(User.browser_id == user_data.browser_id)
    user = session.exec(statement).first()
    if user:
        user.nickname = user_data.nickname
        user.role = user_data.role
    else:
        user = User(
            browser_id=user_data.browser_id,
            nickname=user_data.nickname,
            role=user_data.role,
        )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
