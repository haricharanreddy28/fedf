# SafeSpace - Domestic Violence Support Application

A secure, gender-responsive web application designed to support victims/survivors of domestic violence by offering legal rights information, emergency help, counselling & support services, and secure channels for contacting counsellors and legal advisors.

## Tech Stack

### Frontend
- **React 18** with **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety
- **React Router DOM** - Routing
- **React Hook Form + Yup** - Form management and validation
- **Axios** - HTTP client
- **Framer Motion** - Animations

### Backend
- **Node.js** with **Express** - Server framework
- **MongoDB** with **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

### Installation

1. **Install frontend dependencies:**
```bash
npm install --legacy-peer-deps
```

2. **Install backend dependencies:**
```bash
cd server
npm install
```

3. **Set up environment variables:**

Create `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/safespace
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

Create `.env` in root (for frontend):
```
VITE_API_URL=http://localhost:3001/api
```

### Running the Application

1. **Start MongoDB** (if not already running):
```bash
# Make sure MongoDB is running on localhost:27017
```

2. **Start the backend server:**
```bash
cd server
npm run dev
# Server will run on http://localhost:3001
```

3. **Start the frontend (in a new terminal):**
```bash
npm run dev
# Frontend will run on http://localhost:2911
```

### Default Admin Account
- **Email**: admin@safeplace.com
- **Password**: admin123
- **Role**: Admin

*Note: You'll need to register this account first or create it through the registration page.*

## Project Structure

```
├── server/                 # Backend API
│   ├── config/            # Database configuration
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── server.js         # Server entry point
├── src/                   # Frontend source
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── utils/            # Utilities (auth, storage, API)
│   ├── types/            # TypeScript definitions
│   └── context/          # React Context providers
└── public/               # Static assets
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Legal Rights
- `GET /api/legal-rights` - Get all legal rights
- `GET /api/legal-rights/:id` - Get legal right by ID
- `POST /api/legal-rights` - Create legal right (Admin/Legal)
- `PUT /api/legal-rights/:id` - Update legal right (Admin/Legal)
- `DELETE /api/legal-rights/:id` - Delete legal right (Admin/Legal)

### Support Services
- `GET /api/support-services` - Get all services
- `GET /api/support-services/:id` - Get service by ID
- `POST /api/support-services` - Create service (Admin)
- `PUT /api/support-services/:id` - Update service (Admin)
- `DELETE /api/support-services/:id` - Delete service (Admin)

### Case Notes
- `GET /api/case-notes` - Get case notes (filtered by role)
- `GET /api/case-notes/:id` - Get case note by ID
- `POST /api/case-notes` - Create case note (Counsellor)
- `PUT /api/case-notes/:id` - Update case note (Counsellor)
- `DELETE /api/case-notes/:id` - Delete case note (Counsellor)

## Features

### 🎨 UI/UX Design
- Gender-sensitive color palette (soft purple, teal, white)
- Trauma-informed UI design
- Fully responsive
- Dark/Light mode support

### 🔐 Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Role-based access control

### 🛡️ Safety Features
- Safe Exit Button
- Stealth Mode
- Session management
- Anonymous testimonials

### 📋 Role-Based Dashboards
- **Admin**: User and content management
- **Victim/Survivor**: Access help and resources
- **Counsellor**: Case management
- **Legal Advisor**: Legal content management

## Database Models

- **User**: name, email, password (hashed), role, createdAt
- **LegalRight**: title, description, category, updatedAt, updatedBy
- **SupportService**: name, description, contact, location, category
- **CaseNote**: survivorId, counsellorId, date, notes, riskLevel, createdAt

## Development

### Backend Development
```bash
cd server
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
npm run dev  # Vite dev server with HMR
```

### Building for Production
```bash
# Frontend
npm run build

# Backend
cd server
npm start
```

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

### Backend (server/.env)
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3001)
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## License

This project is created for educational/hackathon purposes.

## Support

For issues or questions, please contact the development team.
