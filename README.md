# 📊 Sales Analytics Application

A complete, production-ready full-stack web application for shop sales data entry and analytics with professional dashboard visualization.

## Features

✅ **Modern Web Dashboard** - Professional analytics interface with real-time data visualization
✅ **Data Entry Form** - Easy-to-use form for inputting sales records
✅ **RESTful API** - Complete CRUD operations for sales data management
✅ **Interactive Charts** - Bar charts, line trends, pie charts for analytics
✅ **Data Export** - Export sales data to Excel with formatted styling
✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
✅ **Real-time Updates** - Dashboard auto-refreshes after new data entry
✅ **Advanced Filtering** - Filter by region and month
✅ **Sortable Tables** - Click headers to sort by any column
✅ **Pagination** - Navigate through large datasets efficiently

## 🎯 Use Cases

- **Store Managers**: Track daily sales performance and profitability
- **Finance Teams**: Monitor regional sales trends and profit distribution
- **Sales Representatives**: Enter sales data and view immediate analytics
- **Business Analysts**: Generate reports and export data for deeper analysis

## 🏗️ Architecture

```
sales-analytics-app/
│
├── backend/                 # Python FastAPI backend
│   ├── main.py             # FastAPI app and routes
│   ├── models.py           # Database models
│   ├── schemas.py          # Data validation schemas
│   ├── database.py         # Database configuration
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Backend documentation
│
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── services/       # API integration
│   │   ├── App.jsx         # Main application
│   │   └── index.jsx       # Entry point
│   ├── package.json        # Node dependencies
│   └── README.md           # Frontend documentation
│
├── setup-guide.md          # This comprehensive setup guide
└── database-schema.sql     # Database schema (for reference)
```

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 16+** with npm
- Any modern web browser

### Step 1: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python main.py
```

✅ Backend running at: `http://localhost:8000`
📖 API Docs available at: `http://localhost:8000/docs`

### Step 2: Setup Frontend

Open a **new terminal** and run:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running at: `http://localhost:3000` (or `http://localhost:5173`)

### Step 3: Access the Application

1. Open browser to `http://localhost:3000`
2. Click "Data Entry" to add sales records
3. Click "Dashboard" to view analytics
4. Use "Export to Excel" to download data

**That's it! 🎉 Your full-stack app is ready!**

## 📋 Form Fields

When entering data, use the following fields:

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| Region | Dropdown | East, West, North, South | Required |
| Sales Amount | Number | 5000.00 | Must be > 0 |
| Price | Number | 100.00 | Unit price |
| Profit | Number | 1000.00 | Net profit |
| Discount | Percentage | 10 | Range: 0-100 |
| Date | Date | 2024-03-12 | YYYY-MM-DD |
| Month | Auto-filled | March | Automatically filled from date |

## 📊 Dashboard Features

### Summary Metrics
- **Total Sales**: Sum of all sales amounts
- **Total Profit**: Sum of all profits
- **Average Discount**: Mean discount percentage across all transactions
- **Record Count**: Total number of sales records

### Charts and Visualizations
1. **Sales by Region** (Bar Chart)
   - Compare sales performance across regions
   - See transaction counts per region

2. **Monthly Sales Trend** (Line Chart)
   - Track sales progression throughout the year
   - Identify seasonal patterns

3. **Profit Distribution** (Pie Chart)
   - Visualize profit split by region
   - Understand which regions are most profitable

4. **Regional Summary** (Stats Card)
   - Detailed metrics for each region
   - Sales amount and transaction count

### Sales Records Table
- View all records with sortable columns
- Filter by region
- Pagination (5, 10, 25, 50 records per page)
- Delete individual records
- **Export to Excel** with professional formatting

## 🔌 API Endpoints

### Create Sales Record
```bash
POST http://localhost:8000/api/sales
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
```

### Get All Records
```bash
GET http://localhost:8000/api/sales?skip=0&limit=100&region=East&month=March
```

### Get Analytics Summary
```bash
GET http://localhost:8000/api/analytics/summary
```

### Export to Excel
```bash
GET http://localhost:8000/api/export/excel
```

See `backend/README.md` for complete API documentation.

## 💾 Database

- **Type**: SQLite (no external server needed)
- **Location**: `backend/data/sales.db`
- **Auto-created**: First time you start the backend

### Schema
```sql
sales_records
├── id (Primary Key)
├── region (VARCHAR)
├── sales_amount (FLOAT)
├── price (FLOAT)
├── profit (FLOAT)
├── discount (FLOAT)
├── date (DATE)
├── month (VARCHAR)
└── created_at (DATETIME)
```

## 📁 Technology Stack

### Backend
- **Framework**: FastAPI (modern Python web framework)
- **Database**: SQLite (lightweight, file-based)
- **ORM**: SQLAlchemy (database abstraction)
- **Validation**: Pydantic (data validation)
- **Export**: openpyxl (Excel file generation)
- **Server**: Uvicorn (ASGI server)

### Frontend
- **Library**: React 18 (UI framework)
- **Build Tool**: Vite (fast bundler)
- **Charts**: Recharts (data visualization)
- **HTTP Client**: Axios (API calls)
- **Styling**: CSS3 (responsive design)

### Deployment Ready
- Docker support ready (templates available)
- Environment variables configuration
- CORS enabled for production
- Production build optimizations

## 🎨 UI/UX Design

### Professional Business Aesthetic
- Modern blue color scheme (#3498db)
- Clean card-based layout
- Clear visual hierarchy
- Responsive grid system
- Smooth animations and transitions

### Accessibility
- Semantic HTML
- Keyboard navigation support
- ARIA labels where needed
- High contrast colors for readability
- Mobile-friendly touch targets

## 🔒 Security Considerations

For production deployment, consider:
1. Add authentication/authorization
2. Implement input sanitization
3. Use HTTPS/TLS encryption
4. Add rate limiting
5. Set up CORS properly for your domain
6. Use environment variables for sensitive data
7. Add SQL injection prevention (already handled by SQLAlchemy ORM)

## 📈 Scaling the Application

### Small Scale (< 10,000 records)
- Current SQLite setup is sufficient
- No additional configuration needed

### Medium Scale (10,000 - 1,000,000 records)
```bash
# Switch to PostgreSQL
pip install psycopg2-binary
# Update DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@localhost/sales_db
```

### Large Scale (> 1,000,000 records)
- Consider adding Redis caching
- Implement pagination more aggressively
- Add database indexing strategies
- Consider data archiving/partitioning

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.8+

# Check if port is in use
# Windows: netstat -ano | findstr :8000
# macOS/Linux: lsof -i :8000

# Try different port
uvicorn main:app --port 8001
```

### Frontend won't start
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 16+
```

### Can't connect to API
1. Verify backend is running
2. Check `.env` file in frontend
3. Verify firewall isn't blocking port 8000
4. Check browser console for error details

### Database errors
```bash
# Reset database
rm backend/data/sales.db
# Restart backend to recreate
```

## 📚 Documentation

- **Backend Docs**: See `backend/README.md`
- **Frontend Docs**: See `frontend/README.md`
- **API Swagger**: Visit `http://localhost:8000/docs` when backend is running

## 🚀 Deployment Guide

### Deploy Backend (Example: Heroku)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Deploy Frontend (Example: Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Netlify
```

### Deploy with Docker (Platform: Any)
See `Dockerfile` and `docker-compose.yml` in respective directories.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the individual README files
3. Check the API documentation at `/docs`
4. Review console error messages

## 📄 Project Structure Explained

```
backend/
├── main.py              ← All routes and API logic
├── models.py            ← Database table definitions
├── schemas.py           ← Request/response validation
├── database.py          ← DB connection setup
└── data/
    └── sales.db         ← SQLite database (auto-created)

frontend/
├── src/
│   ├── components/      ← Reusable React components
│   │   ├── DataEntry    ← Form component
│   │   ├── Dashboard    ← Main dashboard layout
│   │   ├── Analytics    ← Charts component
│   │   └── SalesTable   ← Data table component
│   ├── services/
│   │   └── api.js       ← API client
│   ├── App.jsx          ← Main app component
│   └── index.jsx        ← React root
├── index.html           ← HTML template
└── vite.config.js       ← Build config
```

## 💡 Tips for Best Results

1. **Data Entry**: Enter realistic monthly data spread across all regions for best visualizations
2. **Date Format**: Always use YYYY-MM-DD format
3. **Discount Range**: Keep discount between 0-100%
4. **Excel Export**: Download regularly for backup and reporting
5. **Browser Cache**: Clear cache if styles don't update after restart

## ✨ Future Enhancements

Possible additions for advanced use:
- User authentication and multi-user support
- Advanced filtering and search
- Custom date range analytics
- Predictive analytics with ML
- Mobile app (React Native)
- Real-time updates with WebSockets
- Multi-language support
- Dark theme option
- API rate limiting and quotas
- Advanced reporting and PDF export

## 📜 License

MIT License - Free to use for personal and commercial projects

## 🎓 Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Recharts Documentation](https://recharts.org/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

---

**Built with ❤️ as a production-ready full-stack application**

Happy analyzing! 📊
