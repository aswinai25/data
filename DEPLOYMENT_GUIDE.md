# Complete Deployment Guide: Vercel (Frontend) + Render (Backend)

## Overview
- **Frontend**: React app → Vercel (free, automatic deployments)
- **Backend**: FastAPI → Render (free tier available)
- **Database**: SQLite (file-based, included with backend)

---

## STEP 1: Deploy Backend to Render

### 1.1 Create Render Account
1. Go to https://render.com
2. Click "Sign Up"
3. Sign up with GitHub (easier)
4. Authorize Render to access your GitHub

### 1.2 Create Web Service
1. In Render dashboard, click **New +** → **Web Service**
2. Select your GitHub repository: `aswinai25/data`
3. Configure:
   - **Name**: `sales-analytics-api`
   - **Environment**: `Python 3.10`
   - **Root Directory**: `backend` (optional, if needed)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Region**: Choose closest to you
   - **Plan**: Free (or Paid if you need better uptime)

### 1.3 Add Environment Variables
In the Render dashboard, go to your service → **Environment**

Add these variables:
```
ENVIRONMENT=production
DEBUG=False
FRONTEND_URL=https://your-frontend-app.vercel.app
```

(You'll update FRONTEND_URL after deploying frontend)

### 1.4 Deploy
1. Click **Deploy** button
2. Wait for deployment to complete (2-5 minutes)
3. Copy your backend URL from the dashboard (e.g., `https://sales-analytics-api.onrender.com`)

---

## STEP 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended)
4. Authorize Vercel to access your GitHub

### 2.2 Import Your Project
1. Click **Add New** → **Project**
2. Select your GitHub repository: `aswinai25/data`
3. Click **Import**

### 2.3 Configure Project Settings
1. **Root Directory**: Set to `frontend`
2. **Framework**: Should auto-detect as "Vite"
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Environment Variables**:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com` (use the Render URL from Step 1)

### 2.4 Deploy
1. Click **Deploy**
2. Wait for deployment (2-3 minutes)
3. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

---

## STEP 3: Update Backend CORS Configuration

1. Go back to Render dashboard
2. Update the **FRONTEND_URL** environment variable:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Click **Save** to redeploy backend

---

## STEP 4: Test Your Deployment

### 4.1 Test Backend
Open in browser or terminal:
```
https://your-backend.onrender.com/health
```
Should return: `{"status":"healthy",...}`

### 4.2 Test Frontend
1. Open `https://your-app.vercel.app` in browser
2. Check if you can access the Dashboard
3. Try adding a sales record
4. Verify data appears in the dashboard

### 4.3 Check Browser Console
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
- Look for error messages in logs

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

### Frontend (Vercel dashboard):
```
VITE_API_URL=https://your-backend.onrender.com
```

### Backend (Render dashboard):
```
ENVIRONMENT=production
DEBUG=False
FRONTEND_URL=https://your-app.vercel.app
```
