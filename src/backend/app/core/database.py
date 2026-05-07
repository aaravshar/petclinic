import os
import time
from sqlmodel import SQLModel, Session, create_engine

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/webapp_db")

engine = create_engine(DATABASE_URL, echo=False)


def get_session():
    with Session(engine) as session:
        yield session


def init_db(retries: int = 5, delay: float = 2.0):
    for attempt in range(retries):
        try:
            SQLModel.metadata.create_all(engine)
            print("Database initialized successfully.")
            return
        except Exception as e:
            print(f"DB init attempt {attempt + 1} failed: {e}")
            if attempt < retries - 1:
                time.sleep(delay)
            else:
                raise
