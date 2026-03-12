-- Sales Analytics Database Schema
-- SQLite Database
-- File: data/sales.db (auto-created by SQLAlchemy)

-- Table: sales_records
-- Purpose: Store all sales transactions
-- Created: Automatically by FastAPI on first run

CREATE TABLE IF NOT EXISTS sales_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    region VARCHAR(50) NOT NULL,
    sales_amount FLOAT NOT NULL,
    price FLOAT NOT NULL,
    profit FLOAT NOT NULL,
    discount FLOAT NOT NULL,
    date DATE NOT NULL,
    month VARCHAR(20) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for query performance
CREATE INDEX IF NOT EXISTS idx_sales_region ON sales_records(region);
CREATE INDEX IF NOT EXISTS idx_sales_date ON sales_records(date);
CREATE INDEX IF NOT EXISTS idx_sales_month ON sales_records(month);

-- Sample Data (for testing)
INSERT INTO sales_records (region, sales_amount, price, profit, discount, date, month) VALUES
('East', 5000.00, 100.00, 1000.00, 10.0, '2024-01-15', 'January'),
('West', 3500.00, 80.00, 700.00, 5.0, '2024-01-20', 'January'),
('North', 4200.00, 90.00, 840.00, 8.0, '2024-01-22', 'January'),
('South', 4800.00, 95.00, 960.00, 12.0, '2024-01-25', 'January'),
('East', 6000.00, 110.00, 1200.00, 15.0, '2024-02-10', 'February'),
('West', 4000.00, 85.00, 800.00, 10.0, '2024-02-15', 'February'),
('North', 5500.00, 100.00, 1100.00, 8.0, '2024-02-18', 'February'),
('South', 5200.00, 98.00, 1040.00, 7.0, '2024-02-20', 'February'),
('East', 7000.00, 120.00, 1400.00, 12.0, '2024-03-05', 'March'),
('West', 5500.00, 95.00, 1100.00, 9.0, '2024-03-10', 'March'),
('North', 6200.00, 105.00, 1240.00, 11.0, '2024-03-15', 'March'),
('South', 6500.00, 110.00, 1300.00, 10.0, '2024-03-20', 'March');

-- Views for Analytics (optional, for reference)

-- Monthly Sales Summary
CREATE VIEW IF NOT EXISTS v_monthly_sales AS
SELECT 
    month,
    SUM(sales_amount) as total_sales,
    SUM(profit) as total_profit,
    AVG(discount) as avg_discount,
    COUNT(*) as transaction_count
FROM sales_records
GROUP BY month;

-- Regional Sales Summary
CREATE VIEW IF NOT EXISTS v_regional_sales AS
SELECT 
    region,
    SUM(sales_amount) as total_sales,
    SUM(profit) as total_profit,
    AVG(discount) as avg_discount,
    COUNT(*) as transaction_count
FROM sales_records
GROUP BY region;

-- Overall Summary
CREATE VIEW IF NOT EXISTS v_overall_summary AS
SELECT 
    SUM(sales_amount) as total_sales,
    SUM(profit) as total_profit,
    AVG(discount) as avg_discount,
    COUNT(*) as transaction_count
FROM sales_records;

-- Table Statistics
-- Fields:
-- id: Unique identifier (Primary Key), Auto-increment
-- region: Sales region (East, West, North, South)
-- sales_amount: Total sales in currency units
-- price: Unit price of product/service
-- profit: Net profit from transaction
-- discount: Discount percentage applied (0-100)
-- date: Date of transaction (YYYY-MM-DD format)
-- month: Month name (January - December)
-- created_at: Timestamp when record was created (auto-set)

-- Data Types:
-- INTEGER: id (auto-increment)
-- VARCHAR: region, month (text fields)
-- FLOAT: sales_amount, price, profit, discount (decimal numbers)
-- DATE: date (YYYY-MM-DD)
-- DATETIME: created_at (auto-timestamp)

-- Constraints:
-- id: PRIMARY KEY, AUTOINCREMENT
-- region: NOT NULL (required)
-- sales_amount: NOT NULL (required), must be positive
-- price: NOT NULL (required), must be positive
-- profit: NOT NULL (required)
-- discount: NOT NULL (required), range 0-100
-- date: NOT NULL (required)
-- month: NOT NULL (required)

-- Performance Notes:
-- - Indexes created on region, date, month for faster queries
-- - SQLite supports up to ~1 billion records
-- - For datasets > 1 million, consider PostgreSQL migration

-- Common Queries:

-- Total sales by region
-- SELECT region, SUM(sales_amount) as total_sales FROM sales_records GROUP BY region;

-- Monthly sales trend
-- SELECT month, SUM(sales_amount) as total_sales FROM sales_records GROUP BY month ORDER BY date;

-- Profit by region
-- SELECT region, SUM(profit) as total_profit FROM sales_records GROUP BY region;

-- Average discount by region
-- SELECT region, AVG(discount) as avg_discount FROM sales_records GROUP BY region;

-- Sales for specific date range
-- SELECT * FROM sales_records WHERE date BETWEEN '2024-01-01' AND '2024-03-31';

-- Top performing regions (by sales)
-- SELECT region, SUM(sales_amount) as total_sales FROM sales_records GROUP BY region ORDER BY total_sales DESC;
