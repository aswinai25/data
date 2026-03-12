"""
Database configuration and connection setup with Supabase or SQLite fallback
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get Supabase credentials from environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip()
SUPABASE_DB_PASSWORD = os.getenv("SUPABASE_DB_PASSWORD", "").strip()

# Determine database connection string
if SUPABASE_URL and SUPABASE_DB_PASSWORD:
    # Use Supabase PostgreSQL
    host = SUPABASE_URL.replace("https://", "").replace("http://", "")
    SQLALCHEMY_DATABASE_URL = f"postgresql://postgres:{SUPABASE_DB_PASSWORD}@db.{host}:5432/postgres"
    print("Using Supabase PostgreSQL database")
else:
    # Fallback to SQLite for local development
    db_dir = Path("./data")
    db_dir.mkdir(exist_ok=True)
    SQLALCHEMY_DATABASE_URL = "sqlite:///./data/sales.db"
    print("Using SQLite database (local)")

# Create base class for models
Base = declarative_base()

# Create engine
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        connect_args={"check_same_thread": False},
        echo=False
    )
else:
    # PostgreSQL settings
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        pool_pre_ping=True,
        echo=False
    )

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
