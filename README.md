# Full-Stack Notes App with User Authentication

A complete, production-ready notes application with JWT-based authentication, built with Node.js/Express backend and Next.js frontend (TypeScript). Users can register, login, and manage their personal notes securely.

## 🚀 Features

### Backend
- User Registration & Login with JWT authentication
- Password hashing with bcryptjs
- Protected API routes
- Create, Read, Update, Delete (CRUD) operations for notes
- Input validation with express-validator
- MongoDB database with Mongoose ODM
- Error handling middleware
- CORS enabled

### Frontend
- Modern Next.js 14 with TypeScript
- Responsive design with custom CSS
- JWT token storage and management
- Protected routes and authenticated API calls
- Real-time note management (create, edit, delete)
- Modal dialogs for editing notes
- Form validation and error handling
- Loading states and user feedback

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JSON Web Token | Authentication |
| bcryptjs | Password hashing |
| express-validator | Input validation |
| cors | Cross-origin resource sharing |
| dotenv | Environment variables |

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework |
| TypeScript | Type safety |
| React Hooks | State management |
| Axios | HTTP client |
| CSS3 | Styling |

## 📁 Project Structure
notes-app/
├── backend/
│ ├── models/
│ │ ├── User.js # User schema and model
│ │ └── Note.js # Note schema and model
│ ├── middleware/
│ │ └── auth.js # JWT authentication middleware
│ ├── routes/
│ │ ├── auth.js # Authentication routes
│ │ └── notes.js # Notes CRUD routes
│ ├── .env.example # Environment variables template
│ ├── package.json # Backend dependencies
│ └── server.js # Entry point
├── frontend/
│ ├── components/ # React components
│ │ ├── AuthForm.tsx
│ │ ├── EditModal.tsx
│ │ ├── NoteCard.tsx
│ │ └── NoteForm.tsx
│ ├── hooks/ # Custom React hooks
│ │ ├── useAuth.ts
│ │ └── useNotes.ts
│ ├── pages/ # Next.js pages
│ │ ├── _app.tsx
│ │ └── index.tsx
│ ├── services/ # API services
│ │ └── api.ts
│ ├── styles/ # CSS styles
│ │ └── globals.css
│ ├── types/ # TypeScript type definitions
│ │ └── index.ts
│ ├── .env.example # Environment variables template
│ ├── next.config.js # Next.js configuration
│ ├── package.json # Frontend dependencies
│ └── tsconfig.json # TypeScript configuration
└── README.md # This file


## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/notes-app.git
cd notes-app

cd backend
npm install

cp .env.example .env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/notes_app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
cd frontend

npm install
cp .env.example .env.local
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Method	Endpoint	Description	Access
GET	/	Get all user notes	Private
POST	/	Create a new note	Private
PUT	/:id	Update a specific note	Private
DELETE	/:id	Delete a specific note	Private
