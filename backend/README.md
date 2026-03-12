# Sales Analytics Backend API

FastAPI-based RESTful API for sales data management and analytics.

## Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. **Create and activate a virtual environment:**

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

2. **Install dependencies:**

```bash
pip install -r requirements.txt
```

3. **Run the server:**

```bash
python main.py
```

The API will be available at `http://localhost:8000`

### API Documentation

Once the server is running, visit:
- **Interactive Docs**: http://localhost:8000/docs (Swagger UI)
- **Alternative Docs**: http://localhost:8000/redoc (ReDoc)

## API Endpoints

### Sales CRUD Operations

#### Create Sales Record
```
POST /api/sales
Content-Type: application/json

{
  "region": "East",
  "sales_amount": 5000.00,
  "price": 100.00,
  "profit": 1000.00,
  "discount": 10.0,
  "date": "2024-03-12",
  "month": "March"
}

Response: 201 Created
{
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
```

#### Get All Sales Records
```
GET /api/sales?skip=0&limit=100&region=East&month=March

Response: 200 OK
[
  {
    "id": 1,
    "region": "East",
    "sales_amount": 5000.00,
    ...
  },
  ...
]
```

#### Get Single Record
```
GET /api/sales/{id}

Response: 200 OK
```

#### Update Record
```
PUT /api/sales/{id}
Content-Type: application/json

{
  "sales_amount": 5500.00,
  "profit": 1100.00
}

Response: 200 OK
```

#### Delete Record
```
DELETE /api/sales/{id}

Response: 204 No Content
```

### Analytics Endpoints

#### Summary Metrics
```
GET /api/analytics/summary

Response:
{
  "total_sales": 50000.00,
  "total_profit": 10000.00,
  "average_discount": 12.5,
  "record_count": 10
}
```

#### Sales by Region
```
GET /api/analytics/by-region

Response:
[
  {"region": "East", "sales": 15000.00, "count": 3},
  {"region": "West", "sales": 12000.00, "count": 2},
  ...
]
```

#### Sales by Month
```
GET /api/analytics/by-month

Response:
[
  {"month": "January", "sales": 10000.00, "count": 2},
  {"month": "March", "sales": 25000.00, "count": 5},
  ...
]
```

#### Profit by Region
```
GET /api/analytics/profit-by-region

Response:
[
  {"region": "East", "profit": 3000.00, "count": 3},
  ...
]
```

### Export Endpoint

#### Export to Excel
```
GET /api/export/excel

Response: Generates Excel file with all sales records
{
  "filename": "sales_export_20240312_103000.xlsx",
  "path": "exports/sales_export_20240312_103000.xlsx",
  "count": 10
}
```

## Database

- **Type**: SQLite (file-based, no server required)
- **Location**: `./data/sales.db`
- **Table**: `sales_records`

### Schema

```sql
CREATE TABLE sales_records (
  id INTEGER PRIMARY KEY,
  region VARCHAR(50) NOT NULL,
  sales_amount FLOAT NOT NULL,
  price FLOAT NOT NULL,
  profit FLOAT NOT NULL,
  discount FLOAT NOT NULL,
  date DATE NOT NULL,
  month VARCHAR(20) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

See `.env` file for configuration:

```env
DATABASE_URL=sqlite:///./data/sales.db
ENVIRONMENT=development
DEBUG=True
```

## Project Structure

```
backend/
├── main.py              # FastAPI application and routes
├── models.py            # SQLAlchemy ORM models
├── schemas.py           # Pydantic validation schemas
├── database.py          # Database configuration
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables
└── data/               # Database files (auto-created)
    └── sales.db        # SQLite database
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- **200 OK**: Successful GET request
- **201 Created**: Successful POST request
- **204 No Content**: Successful DELETE request
- **400 Bad Request**: Validation error
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

Error responses include a detail message:
```json
{
  "detail": "Sales record not found"
}
```

## Development

### Enable SQL Query Logging

In `database.py`, change `echo=False` to `echo=True` to log all SQL queries.

### Testing Endpoints

Use curl, Postman, or the interactive API docs at `/docs`:

```bash
# Create a record
curl -X POST "http://localhost:8000/api/sales" \
  -H "Content-Type: application/json" \
  -d '{"region":"East","sales_amount":5000,"price":100,"profit":1000,"discount":10,"date":"2024-03-12","month":"March"}'

# Get all records
curl "http://localhost:8000/api/sales"

# Get summary
curl "http://localhost:8000/api/analytics/summary"
```

## Performance Notes

- SQLite is suitable for development and small to medium datasets
- For large-scale production, consider migrating to PostgreSQL
- Records are indexed by: id, region, date, month for faster queries

## Troubleshooting

### Port already in use
```bash
# Run on different port
uvicorn main:app --host 0.0.0.0 --port 8001
```

### Database locked
Delete `./data/sales.db` and restart the server to reset

### Import errors
Ensure all dependencies are installed:
```bash
pip install -r requirements.txt --force-reinstall
```

## License

MIT License - Feel free to use this code for your projects.
