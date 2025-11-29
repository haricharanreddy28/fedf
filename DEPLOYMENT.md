# Deployment Guide

This guide outlines the steps to deploy the SafeSpace application (Backend and Frontend).

## Prerequisites
- GitHub Account
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Account (for Database)
- [Render](https://render.com/) Account (for Backend)
- [Vercel](https://vercel.com/) Account (for Frontend)

---

## 1. Database Setup (MongoDB Atlas)

1.  Log in to MongoDB Atlas and create a new project.
2.  Build a **Database Cluster** (The free M0 tier is sufficient).
3.  **Create a Database User**:
    - Go to "Database Access".
    - Add a new database user with a username and password. **Save these credentials.**
4.  **Network Access**:
    - Go to "Network Access".
    - Add IP Address -> Allow Access from Anywhere (`0.0.0.0/0`).
5.  **Get Connection String**:
    - Go to "Database" -> "Connect" -> "Drivers".
    - Copy the connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`).
    - Replace `<password>` with the password you created in step 3.

---

## 2. Backend Deployment (Render)

1.  Push your code to a GitHub repository.
2.  Log in to [Render](https://render.com/).
3.  Click **"New +"** and select **"Web Service"**.
4.  Connect your GitHub repository.
5.  **Configuration**:
    - **Name**: `safespace-backend` (or your preferred name)
    - **Region**: Choose the one closest to you (e.g., Singapore, Frankfurt).
    - **Branch**: `main` (or your default branch).
    - **Root Directory**: `backend` (Important: The backend code is in a subdirectory).
    - **Runtime**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
6.  **Environment Variables**:
    - Scroll down to "Environment Variables" and add the following:
        - `NODE_ENV`: `production`
        - `MONGO_URI`: (Paste your MongoDB connection string from Step 1)
        - `JWT_SECRET`: (Generate a strong random string)
        - `RAZORPAY_KEY_ID`: (Your Razorpay Key ID)
        - `RAZORPAY_KEY_SECRET`: (Your Razorpay Key Secret)
7.  Click **"Create Web Service"**.
8.  Wait for the deployment to finish. Once live, copy the **Service URL** (e.g., `https://safespace-backend.onrender.com`).

---

## 3. Frontend Deployment (Vercel)

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  **Configure Project**:
    - **Framework Preset**: Vite
    - **Root Directory**: Click "Edit" and select `frontend`.
5.  **Environment Variables**:
    - Expand "Environment Variables".
    - Add:
        - `VITE_API_URL`: (Paste your Backend Service URL from Step 2, e.g., `https://safespace-backend.onrender.com/api`)
          *Note: Ensure you add `/api` at the end if your backend routes are prefixed with it, or just the base URL if the frontend appends it. Based on your code, the frontend expects the base URL.*
6.  Click **"Deploy"**.

---

## 4. Verification

1.  Open your deployed Frontend URL.
2.  Try to Sign Up / Login.
3.  Check if data loads correctly (this confirms Database and Backend connection).
