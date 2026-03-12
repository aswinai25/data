"""
SQLAlchemy database models
"""
from sqlalchemy import Column, Integer, String, Float, Date, DateTime
from datetime import datetime
from database import Base


class SalesRecord(Base):
    """Sales Record model representing a single transaction."""
    
    __tablename__ = "sales_records"
    
    id = Column(Integer, primary_key=True, index=True)
    region = Column(String(50), index=True, nullable=False)
    sales_amount = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    profit = Column(Float, nullable=False)
    discount = Column(Float, nullable=False)
    date = Column(Date, nullable=False, index=True)
    month = Column(String(20), index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<SalesRecord(id={self.id}, region={self.region}, sales={self.sales_amount})>"
