# SafeSpace - Domestic Violence Support Application

A secure, gender-responsive web application designed to support victims/survivors of domestic violence by offering legal rights information, emergency help, counselling & support services, and secure channels for contacting counsellors and legal advisors.

## Features

### 🎨 UI/UX Design
- **Gender-sensitive color palette**: Soft purple, teal, and white
- **Trauma-informed UI**: Calm, safe, and comforting design
- **Highly intuitive navigation**: Easy-to-use interface
- **Perfect responsiveness**: Works on all devices
- **Dark/Light mode**: Comfortable viewing in any environment

### 🔐 Authentication
- Secure registration and login
- Role-based access control (Admin, Victim/Survivor, Counsellor, Legal Advisor)
- Session management with LocalStorage
- "Hide My Activity" button for quick session clearing

### 🛡️ Safety Features
- **Safe Exit Button**: Instantly redirects to Google.com and clears session
- **Stealth Mode**: Camouflaged UI for privacy
- **Anonymous testimonials**: Safe sharing of experiences
- **Emergency hotlines**: Integrated emergency contacts

### 📋 Role-Based Dashboards

#### Victim/Survivor Dashboard
- "Get Help Now" button
- Legal rights information
- Safe chat with counsellor
- Support services directory
- Progress notes from counsellor
- Hide account (stealth mode UI)

#### Counsellor Dashboard
- List of assigned survivors
- Chat/Call interface (dummy frontend)
- Case notes (CRUD operations)
- Risk assessment form
- Schedule sessions

#### Legal Advisor Dashboard
- Update legal guidelines (CRUD)
- Upload documents (laws, procedures)
- Chat with survivor
- Provide legal action guidance

#### Admin Dashboard
- Manage users (Create/Update/Delete)
- Manage content (legal rights, support services)
- Secure login & logs
- API monitoring (front-end mock)

### 📝 Form Validation
- Full validation using React Hook Form + Yup
- Real-time validation feedback
- Clear error messages
- Success indicators
- Loading states

### 🔄 CRUD Operations
- Legal Rights management
- Support Services management
- Case Notes management
- User management
- Instant UI updates
- Smooth modal-based forms
- Delete confirmation popups

### 🌐 API Integration
- Axios for API calls
- Loading spinners
- Retry logic
- Error handling
- Mock API support

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Default Admin Account
- **Email**: admin@safeplace.com
- **Password**: admin123
- **Role**: Admin

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Layout.tsx
│   ├── LoadingSpinner.tsx
│   ├── Modal.tsx
│   ├── ProtectedRoute.tsx
│   └── SafeExitButton.tsx
├── context/             # React Context providers
│   └── ThemeContext.tsx
├── pages/               # Page components
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── VictimDashboard.tsx
│   ├── CounsellorDashboard.tsx
│   ├── LegalDashboard.tsx
│   ├── AdminDashboard.tsx
│   ├── EmergencyPage.tsx
│   ├── RightsPage.tsx
│   ├── ContactCounsellorPage.tsx
│   ├── SupportServicesPage.tsx
│   └── NotFoundPage.tsx
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   ├── auth.ts
│   ├── storage.ts
│   └── api.ts
├── App.tsx              # Main app component with routing
└── index.tsx            # Entry point
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router DOM** - Routing
- **React Hook Form** - Form management
- **Yup** - Schema validation
- **Axios** - HTTP client
- **Framer Motion** - Animations (optional)
- **CSS3** - Styling with custom properties

## Data Persistence

- **LocalStorage**: User accounts, legal rights, support services, static resources
- **SessionStorage**: Logged-in user, active role, temporary chat messages

## Safety Features Explained

1. **Safe Exit Button**: Fixed position button that clears all session data and redirects to Google
2. **Stealth Mode**: Transforms the UI to appear as a regular information website
3. **Hide My Activity**: Instantly clears session data and logs out
4. **Anonymous Features**: Testimonials and feedback are anonymous

## Routing

- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/emergency` - Emergency help page
- `/rights` - Legal rights information
- `/contact-counsellor` - Contact counsellor form
- `/support-services` - Support services directory
- `/dashboard/victim` - Victim/Survivor dashboard (protected)
- `/dashboard/counsellor` - Counsellor dashboard (protected)
- `/dashboard/legal` - Legal Advisor dashboard (protected)
- `/dashboard/admin` - Admin dashboard (protected)
- `*` - 404 page

## Development Notes

- All data is stored in LocalStorage/SessionStorage (frontend-only)
- API integration is set up with Axios but uses mock data
- Replace mock API endpoints in `src/utils/api.ts` with your actual backend
- Form validation is comprehensive using Yup schemas
- All components are responsive and accessible

## Future Enhancements

- Backend API integration
- Real-time chat functionality
- Document upload and storage
- Email notifications
- Multi-language support
- Advanced analytics for admin

## License

This project is created for educational/hackathon purposes.

## Support

For issues or questions, please contact the development team.

