#!/bin/bash
set -e

echo "Waiting for database..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Database is ready!"

echo "Running seed script..."
python -m scripts.seed_public

echo "Starting server..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
