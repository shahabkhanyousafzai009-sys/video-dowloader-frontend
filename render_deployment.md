# 🚀 SnapLoad — Render Deployment Guide

This guide provides step-by-step instructions for deploying **SnapLoad** on [Render.com](https://render.com).

Because SnapLoad requires **yt-dlp**, **FFmpeg**, **Python 3**, and **Deno** to process video and audio formats, it runs inside a Docker container.

---

## 📑 Deployment Architecture Options

You can deploy SnapLoad on Render in two ways:

1. **All-in-One Docker Web Service (Recommended)**  
   Deploy the Docker container containing **both** the React Frontend and Node.js Express Backend. Render serves both from a single URL (e.g., `https://snapload.onrender.com`).

2. **Decoupled (Render Backend + Vercel Frontend)**  
   Host the Express Backend Docker image on Render and host the React Frontend on Vercel.

---

## 🛠️ Option 1: All-in-One Deployment on Render (Easiest)

### Step 1: Push Project to GitHub
Make sure your latest code (including `Dockerfile` and `render.yaml`) is pushed to your GitHub repository:
```bash
git add .
git commit -m "Add Render configuration"
git push origin main
```

---

### Step 2: Create Web Service on Render

1. Log into your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** in the top right corner and select **Web Service**.
3. Connect your GitHub repository.
4. Fill in the service details:
   - **Name**: `snapload-video-downloader` (or your preferred name)
   - **Region**: Select the region closest to you or your target users.
   - **Branch**: `main`
   - **Runtime**: **Docker**
   - **Dockerfile Path**: `./Dockerfile`
   - **Instance Type**: **Free** (or Starter for higher CPU/RAM)

---

### Step 3: Configure Environment Variables

Scroll down to **Environment Variables** and add the following keys:

| Key | Value | Description |
|---|---|---|
| `NODE_ENV` | `production` | Enables production mode |
| `PORT` | `3001` | Express server port |
| `ALLOWED_ORIGINS` | `*` | Allows CORS requests (or set to your specific domain) |

#### 🔑 Optional: `COOKIES_CONTENT`
If any platform restricts downloads with bot checks, export your `cookies.txt` using a browser extension (like *Get cookies.txt LOCALLY*) and paste the **raw text** directly into the value for `COOKIES_CONTENT`. SnapLoad automatically parses this at container startup.

---

### Step 4: Health Check & Deployment

1. Expand **Advanced Settings**.
2. Set **Health Check Path** to: `/api/health`
3. Click **Create Web Service**.

Render will now build the Docker image (installing Node, Python, FFmpeg, Deno, yt-dlp) and launch the container. This initial build takes approximately 3–5 minutes.

Once complete, your live site will be available at:  
👉 `https://<your-service-name>.onrender.com`

---

## ⚡ Option 2: Decoupled (Render Backend + Vercel Frontend)

If you prefer Vercel for frontend hosting:

### 1. Backend (Render):
- Follow Steps 1–4 above.
- In Render Environment Variables, set:
  ```env
  ALLOWED_ORIGINS=https://your-frontend.vercel.app
  ```
- Copy your Render backend URL (e.g., `https://snapload-api.onrender.com`).

### 2. Frontend (Vercel):
- In your Vercel project settings, set:
  ```env
  VITE_API_URL=https://snapload-api.onrender.com
  ```
- Redeploy on Vercel.

---

## 🔍 Verification & Health Check

After deployment, check your server health status by navigating to:
`https://<your-app>.onrender.com/api/health`

**Sample Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-08-01T18:55:00.000Z",
  "uptime": 124.5,
  "cookies": {
    "envVarSet": true,
    "cookiesFileExists": true
  }
}
```

---

## 💡 Important Tips for Free Tier on Render

1. **Cold Starts**: On Render's Free tier, services spin down after 15 minutes of inactivity. The first request after sleep may take ~30–50 seconds to boot up.
2. **RAM Usage**: Render Free tier provides 512 MB RAM. FFmpeg 1080p+ merging operations consume temporary memory. If downloads fail under heavy load, consider upgrading to the $7/month Starter plan for 1 GB RAM.
3. **Bandwidth**: High quality video downloads stream directly through chunking (zero server disk storage), ensuring efficient memory usage.
