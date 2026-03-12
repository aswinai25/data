# Complete Deployment Guide: Vercel (Frontend) + Render (Backend)

## Overview
- **Frontend**: React app → Vercel (free, automatic deployments)
- **Backend**: FastAPI → Render (free tier available)
- **Database**: Supabase PostgreSQL (free tier available)

---

## STEP 1: Prepare Your Repository

### 1.1 Push your code to GitHub
```bash
git add .
git commit -m "Prepare for deployment to Vercel and Render"
git push origin main
```

If you haven't pushed to GitHub yet:
1. Go to https://github.com/new
2. Create a new repository
3. Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo.git
   git branch -M main
   git push -u origin main
   ```

---

## STEP 2: Set Up Supabase (Database)

### 2.1 Create Supabase Project
1. Go to https://supabase.com
2. Click "Sign Up" or "Log In"
3. Create a new project:
   - Name: `sales-analytics`
   - Password: (save this!)
   - Region: Choose closest to you
   - Click "Create new project"

### 2.2 Get Your Credentials
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key**

3. Go to **Settings** → **Database**
4. Copy the **Database password**

### 2.3 Get Connection String
1. Go to **Settings** → **Database**
2. Scroll to "Connection strings"
3. Copy the **PostgreSQL** connection string
4. Replace `[YOUR-PASSWORD]` with actual password

---

## STEP 3: Deploy Backend to Render

### 3.1 Create Render Account
1. Go to https://render.com
2. Click "Sign Up"
3. Sign up with GitHub (easier)
4. Authorize Render to access your GitHub

### 3.2 Create Web Service
1. In Render dashboard, click **New +** → **Web Service**
2. Select your GitHub repository
3. Configure:
   - **Name**: `sales-analytics-api`
   - **Environment**: `Python 3.10`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Region**: Choose closest to you
   - **Plan**: Free (or Paid if you need better uptime)

### 3.3 Add Environment Variables
In the Render dashboard, go to your service → **Environment**

Add these variables:
```
ENVIRONMENT=production
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_DB_PASSWORD=your-supabase-password
SUPABASE_KEY=your-anon-key
FRONTEND_URL=https://your-frontend-app.vercel.app
```

(You'll update FRONTEND_URL after deploying frontend)

### 3.4 Deploy
1. Click **Deploy** button
2. Wait for deployment to complete (2-5 minutes)
3. Copy your backend URL from the dashboard (e.g., `https://sales-analytics-api.onrender.com`)

**Important**: Your free Render instance may spin down after 15 minutes of inactivity. For production, upgrade to paid plan or use another service.

---

## STEP 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended)
4. Authorize Vercel to access your GitHub

### 4.2 Import Your Project
1. Click **Add New** → **Project**
2. Select your GitHub repository
3. Click **Import**

### 4.3 Configure Project Settings
1. **Root Directory**: Set to `frontend` (since backend and frontend are in separate folders)
2. **Framework**: Should auto-detect as "Vite"
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Environment Variables**:
   ```
   VITE_API_URL=https://sales-analytics-api.onrender.com
   ```
   (Replace with your actual Render backend URL)

### 4.4 Deploy
1. Click **Deploy**
2. Wait for deployment (2-3 minutes)
3. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

---

## STEP 5: Update Backend CORS Configuration

1. Go back to Render dashboard
2. Update the **FRONTEND_URL** environment variable:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Click **Save** to redeploy

---

## STEP 6: Test Your Deployment

### 6.1 Test Backend
```bash
curl https://your-backend.onrender.com/health
```
Should return: `{"status":"healthy","timestamp":"..."}`

### 6.2 Test Frontend
1. Open `https://your-app.vercel.app` in browser
2. Check if you can access the Dashboard
3. Try adding a sales record
4. Verify data appears in the dashboard

### 6.3 Check Browser Console
1. Open DevTools (F12)
2. Check **Console** for any API errors
3. Check **Network** tab to see API requests

---

## Troubleshooting

### Issue: "Failed to fetch" in frontend
**Solution**: 
- Check that VITE_API_URL is correct in Vercel
- Make sure backend is running on Render
- Check CORS settings in backend/main.py

### Issue: Backend returns 500 error
**Solution**:
- Check Render logs: Dashboard → Service → Logs
- Verify environment variables are set
- Ensure database connection is working

### Issue: Database connection failed
**Solution**:
- Verify Supabase URL and password
- Check that Supabase database is active
- Try using direct connection string instead of individual variables

### Issue: Vercel build fails
**Solution**:
- Check build logs in Vercel dashboard
- Ensure `frontend` is set as root directory
- Verify `package.json` exists in `frontend` folder

### Issue: Render instance spins down
**Solution**:
- For production: Upgrade to paid plan ($7/month minimum)
- Alternative: Use Railway.app or Heroku

---

## Updating Your Application

### When you make code changes:

1. **Commit and push to GitHub**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Automatic Deployment**:
   - Vercel automatically redeploys frontend
   - Render automatically redeploys backend
   - No manual action needed!

---

## Environment Variables Summary

### Frontend (.env in root/Vercel dashboard):
```
VITE_API_URL=https://your-backend.onrender.com
```

### Backend (Render dashboard):
```
ENVIRONMENT=production
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_DB_PASSWORD=your-password
SUPABASE_KEY=your-key
FRONTEND_URL=https://your-app.vercel.app
```

---

## Production Considerations

1. **Database**: Upgrade Supabase to paid plan for production
2. **Backend**: Upgrade Render to paid plan ($7+/month) for 24/7 uptime
3. **Security**: Never commit .env files; use environment variables
4. **Monitoring**: Set up error tracking (Sentry, LogRocket, etc.)
5. **Performance**: Enable caching in Vercel
6. **SSL**: Both Vercel and Render provide free SSL certificates

---

## Quick Reference Links

- Vercel Dashboard: https://vercel.com/dashboard
- Render Dashboard: https://dashboard.render.com
- Supabase Dashboard: https://app.supabase.com
- GitHub: https://github.com

---

## Support

If you encounter issues:
1. Check the service logs (Vercel/Render/Supabase dashboards)
2. Review environment variables are correct
3. Verify GitHub repo is up to date
4. Try manual redeploy from service dashboard
