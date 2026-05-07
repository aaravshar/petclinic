from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import pets, visits, vaccinations, users, admin
from app.core.database import init_db

app = FastAPI(title="Vet Clinic API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pets.router, prefix="/api")
app.include_router(visits.router, prefix="/api")
app.include_router(vaccinations.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
