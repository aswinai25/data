"""
Database configuration and SQLite connection setup
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# SQLite database configuration
db_dir = Path("./data")
db_dir.mkdir(exist_ok=True)
SQLALCHEMY_DATABASE_URL = "sqlite:///./data/sales.db"

# Create base class for models
Base = declarative_base()

# Create SQLite engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    echo=False
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
