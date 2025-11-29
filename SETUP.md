# Setup Instructions

## Quick Start

### 1. Prerequisites
- Node.js (v14 or higher) ✅
- MongoDB (running on localhost:27017) ✅
- npm or yarn ✅

### 2. Installation Complete ✅

All dependencies have been installed:
- ✅ Frontend dependencies installed
- ✅ Backend dependencies installed
- ✅ Environment files created

### 3. Start MongoDB

Make sure MongoDB is running:
```bash
# If using Homebrew on macOS:
brew services start mongodb-community

# Or start manually:
mongod
```

### 4. Seed Database (Optional but Recommended)

This will create the default admin user and initial data:
```bash
cd server
npm run seed
```

**Default Admin Account:**
- Email: `admin@safeplace.com`
- Password: `admin123`
- Role: `admin`

### 5. Start the Application

#### Option 1: Start Both Servers Manually

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

#### Option 2: Use the Startup Script
```bash
./start.sh
```

### 6. Access the Application

- **Frontend**: http://localhost:2911
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## Environment Files

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
```

### Backend (server/.env)
```
MONGODB_URI=mongodb://localhost:27017/safespace
PORT=3001
JWT_SECRET=safespace-secret-key-2024-change-in-production
NODE_ENV=development
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `pgrep mongod`
- Check connection: `mongosh mongodb://localhost:27017`
- Verify database exists: The app will create `safespace` database automatically

### Port Already in Use
- Backend (3001): Change `PORT` in `server/.env`
- Frontend (2911): Change in `vite.config.ts`

### CORS Issues
- Backend CORS is configured to allow all origins in development
- For production, update CORS settings in `server/server.js`

## Next Steps

1. ✅ Start MongoDB
2. ✅ Seed the database (optional)
3. ✅ Start backend server
4. ✅ Start frontend server
5. ✅ Register or login with admin account
6. ✅ Explore the application!

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/users` - Get all users (Admin)
- `GET /api/legal-rights` - Get all legal rights
- `GET /api/support-services` - Get all support services
- `GET /api/case-notes` - Get case notes (filtered by role)

For full API documentation, see README.md

