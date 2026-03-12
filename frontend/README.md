# Sales Analytics Frontend

Professional React-based dashboard for sales data entry and analytics visualization.

## Quick Start

### Prerequisites
- Node.js 16+ and npm (or yarn)

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Configure API endpoint** (optional):

Edit `.env` file if your backend is running on a different URL:
```env
VITE_API_URL=http://localhost:8000
```

3. **Start development server:**

```bash
npm run dev
```

The application will open at `http://localhost:3000` or `http://localhost:5173` (depending on Vite setup)

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm preview
```

## Features

### Dashboard Page
- **Summary Cards**: Display total sales, profit, and average discount
- **Sales by Region**: Interactive bar chart showing sales performance by region (East, West, North, South)
- **Monthly Sales Trend**: Line chart showing sales progression throughout the year
- **Profit Distribution**: Pie chart showing profit breakdown by region
- **Regional Summary**: Detailed statistics table for each region
- **Sales Records Table**: 
  - View all sales data with sorting and pagination
  - Filter by region
  - Delete individual records
  - Export to Excel with formatted headers
  - Pagination controls (5, 10, 25, 50 records per page)

### Data Entry Page
- **Form Fields**:
  - Region (dropdown: East, West, North, South)
  - Sales Amount
  - Price
  - Profit
  - Discount (percentage)
  - Date (auto-fills month based on date selection)
  - Month (auto-filled from date)

- **Features**:
  - Real-time form validation
  - Error messages for invalid inputs
  - Success confirmation after submission
  - Clear button to reset form
  - Automatic dashboard refresh after data entry

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── DataEntry.jsx        # Sales form component
│   │   ├── DataEntry.css        # Form styles
│   │   ├── Dashboard.jsx        # Main dashboard layout
│   │   ├── Dashboard.css        # Dashboard styles
│   │   ├── Analytics.jsx        # Charts and visualizations
│   │   ├── Analytics.css        # Chart styles
│   │   ├── SalesTable.jsx       # Sales records table
│   │   └── SalesTable.css       # Table styles
│   ├── services/
│   │   └── api.js               # API service (axios client)
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # Global styles
│   └── index.jsx                # Entry point
├── public/                      # Static assets
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies
├── .env                        # Environment variables
└── README.md                   # This file
```

## Technology Stack

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Recharts**: Interactive charts
- **Axios**: HTTP client
- **React Router**: Navigation (prepared for future use)
- **date-fns**: Date manipulation

## Component Overview

### DataEntry Component
Form for inputting new sales records with validation and error handling.

**Props:**
- `onRecordAdded`: Callback function when a record is successfully created

### Dashboard Component
Main analytics dashboard with summary, charts, and data tables.

**Props:**
- `refreshTrigger`: Trigger value to refresh dashboard data

**Features:**
- Tab navigation between analytics and records table
- Automatic data refresh
- Loading states

### Analytics Component
Renders charts and visualizations.

**Props:**
- `salesByRegion`: Array of sales data grouped by region
- `salesByMonth`: Array of sales data grouped by months
- `profitByRegion`: Array of profit data grouped by regions

### SalesTable Component
Interactive table with filtering, sorting, and pagination.

**Props:**
- `onRecordDeleted`: Callback when a record is deleted

**Features:**
- Sort by clicking column headers
- Filter by region
- Adjustable rows per page
- Delete individual records
- Export to Excel

## Styling

The application uses a modern, professional design with:
- Blue color scheme (#3498db primary)
- Clean card-based layout
- Responsive grid system
- Smooth transitions and animations
- Mobile-friendly design

### Color Palette
- Primary: #3498db (Blue)
- Secondary: #2c3e50 (Dark Blue-Gray)
- Success: #27ae60 (Green)
- Danger: #e74c3c (Red)
- Warning: #f39c12 (Orange)
- Light: #ecf0f1 (Light Gray)

## API Integration

The `services/api.js` file handles all API communication:

```javascript
// Sales operations
salesAPI.create(data)      // POST /api/sales
salesAPI.getAll(skip, limit, filters)  // GET /api/sales
salesAPI.getById(id)       // GET /api/sales/{id}
salesAPI.update(id, data)  // PUT /api/sales/{id}
salesAPI.delete(id)        // DELETE /api/sales/{id}

// Analytics
analyticsAPI.getSummary()       // GET /api/analytics/summary
analyticsAPI.getSalesByRegion() // GET /api/analytics/by-region
analyticsAPI.getSalesByMonth()  // GET /api/analytics/by-month
analyticsAPI.getProfitByRegion()// GET /api/analytics/profit-by-region
analyticsAPI.exportToExcel()    // GET /api/export/excel
```

## Real-time Updates

The dashboard automatically refreshes when:
- A new record is added via the data entry form
- The "Refresh Data" button is clicked
- User navigates between tabs

Data is fetched using Promise.all() for parallel requests to improve performance.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Responsive Design

- Desktop: Full 3-column chart layout
- Tablet: 2-column layout
- Mobile: Single column stack

## Performance Optimizations

- Code splitting via Vite
- Lazy component loading
- Efficient re-renders using React hooks
- Parallel API requests
- Debounced table sorting

## Troubleshooting

### API Connection Issues
1. Ensure backend is running on `http://localhost:8000`
2. Check `.env` file for correct API URL
3. Check browser console for CORS errors

### Charts not displaying
1. Ensure Recharts is installed: `npm install recharts`
2. Check data format in API response
3. Restart dev server: `npm run dev`

### Form not submitting
1. Check browser console for validation errors
2. Verify all required fields are filled
3. Ensure backend is accessible

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

Deploy the `dist/` folder to any static hosting:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any web server

## License

MIT License - Feel free to use this code for your projects.
