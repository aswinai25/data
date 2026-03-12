"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, Field
from datetime import date as date_type, datetime
from typing import Optional


class SalesRecordCreate(BaseModel):
    """Schema for creating a new sales record."""
    region: str = Field(..., description="Region: East, West, North, or South")
    sales_amount: float = Field(..., gt=0, description="Sales amount in currency")
    price: float = Field(..., gt=0, description="Product price")
    profit: float = Field(..., description="Profit amount")
    discount: float = Field(..., ge=0, le=100, description="Discount percentage (0-100)")
    date: date_type = Field(..., description="Date of sale (YYYY-MM-DD)")
    month: str = Field(..., description="Month name (January - December)")

    class Config:
        example = {
            "region": "East",
            "sales_amount": 5000.00,
            "price": 100.00,
            "profit": 1000.00,
            "discount": 10.0,
            "date": "2024-03-12",
            "month": "March"
        }


class SalesRecordUpdate(BaseModel):
    """Schema for updating a sales record (all fields optional)."""
    region: Optional[str] = None
    sales_amount: Optional[float] = Field(None, gt=0)
    price: Optional[float] = Field(None, gt=0)
    profit: Optional[float] = None
    discount: Optional[float] = Field(None, ge=0, le=100)
    date: Optional[date_type] = None
    month: Optional[str] = None

    class Config:
        example = {
            "sales_amount": 5500.00,
            "profit": 1100.00
        }


class SalesRecordResponse(BaseModel):
    """Schema for sales record response."""
    id: int
    region: str
    sales_amount: float
    price: float
    profit: float
    discount: float
    date: date_type
    month: str
    created_at: datetime

    class Config:
        from_attributes = True
        example = {
            "id": 1,
            "region": "East",
            "sales_amount": 5000.00,
            "price": 100.00,
            "profit": 1000.00,
            "discount": 10.0,
            "date": "2024-03-12",
            "month": "March",
            "created_at": "2024-03-12T10:30:00"
        }
