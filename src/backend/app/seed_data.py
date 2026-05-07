import os
from sqlmodel import Session, select
from app.core.database import engine, init_db
from app.models.user import User
from app.models.pet import Pet
from app.models.vaccination import Vaccination
from datetime import date, datetime


def seed():
    setup_mode = os.getenv("SETUP_MODE", "")
    if setup_mode != "seed":
        print("SETUP_MODE is not 'seed', skipping seed.")
        return

    init_db()

    with Session(engine) as session:
        existing = session.exec(select(User)).first()
        if existing:
            print("Data already seeded, skipping.")
            return

        user1 = User(browser_id="demo-user-1", nickname="Dr. Smith", role="vet")
        user2 = User(browser_id="demo-user-2", nickname="Jane Owner", role="owner")
        session.add(user1)
        session.add(user2)
        session.commit()
        session.refresh(user1)
        session.refresh(user2)

        pet1 = Pet(
            name="Buddy",
            species="Dog",
            breed="Golden Retriever",
            birth_date=date(2020, 3, 15),
            owner_id=user2.id,
            microchip_id="MC-12345",
            notes="Friendly, loves treats",
        )
        pet2 = Pet(
            name="Whiskers",
            species="Cat",
            breed="Siamese",
            birth_date=date(2019, 7, 22),
            owner_id=user2.id,
            microchip_id="MC-67890",
            notes="Indoor cat",
        )
        session.add(pet1)
        session.add(pet2)
        session.commit()
        session.refresh(pet1)
        session.refresh(pet2)

        vax1 = Vaccination(
            pet_id=pet1.id,
            vaccine_name="Rabies",
            administered_date=date(2023, 1, 10),
            next_due_date=date(2024, 1, 10),
            lot_number="LOT-001",
        )
        vax2 = Vaccination(
            pet_id=pet2.id,
            vaccine_name="FVRCP",
            administered_date=date(2023, 3, 5),
            next_due_date=date(2024, 3, 5),
            lot_number="LOT-002",
        )
        session.add(vax1)
        session.add(vax2)
        session.commit()

        print("Seed data inserted successfully.")
