import os
from fastapi import UploadFile

UPLOAD_DIR = "/app/uploads"


async def save_upload(file: UploadFile) -> str:
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    # TODO: add filename sanitization
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)
    return file_path


def get_file_path(filename: str) -> str:
    return os.path.join(UPLOAD_DIR, filename)
