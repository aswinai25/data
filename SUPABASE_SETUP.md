# Supabase Migration Guide

This guide will help you migrate from SQLite to Supabase PostgreSQL.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Sign Up"** or **"Log In"**
3. Create a new project:
   - Click **"New Project"**
   - Enter your project name
   - Set a strong database password (save this!)
   - Choose your region
   - Click **"Create new project"**

## Step 2: Get Your Credentials

1. In your Supabase dashboard, go to **Settings** > **Database**
2. Copy the following information:
   - **Project URL** (Settings > API)
   - **Database password** (you set this during creation)
   - **Anon Key** (Settings > API)

## Step 3: Configure Environment Variables

1. In the `backend/` folder, create a `.env` file (copy from `.env.example`)
2. Fill in your Supabase credentials:
   ```
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_KEY=your-anon-key
   SUPABASE_DB_PASSWORD=your-database-password
   ```

## Step 4: Install Dependencies

Run this command in the `backend/` folder:
```bash
pip install -r requirements.txt
```

## Step 5: Initialize Database Tables

1. Make sure your backend server is running
2. The application will automatically create the tables when it starts
3. Verify in Supabase dashboard: go to **SQL Editor** and run:
   ```sql
   SELECT * FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

## Step 6: Migrate Existing Data (Optional)

If you have data in the old SQLite database, you can migrate it:

1. Export data from SQLite:
   ```bash
   sqlite3 ./data/sales.db ".mode csv" ".headers on" "SELECT * FROM sales_records;" > sales_data.csv
   ```

2. Import to Supabase using the UI or SQL

## Troubleshooting

**Connection Error?**
- Verify your `.env` file has correct credentials
- Check that your Supabase project is active
- Ensure your IP is whitelisted (Supabase allows all IPs by default)

**Table not created?**
- Restart your backend server
- Check SQLAlchemy error logs
- Verify PostgreSQL extension: `CREATE EXTENSION IF EXISTS "uuid-ossp";`

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Your Supabase project URL | `https://abcdefg.supabase.co` |
| `SUPABASE_KEY` | Supabase anon key | `eyJhbGciOi...` |
| `SUPABASE_DB_PASSWORD` | Database password | `your-strong-password` |
