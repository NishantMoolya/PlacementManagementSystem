# Placement Management System

A comprehensive full-stack placement management platform designed to streamline the recruitment process for educational institutions. This system facilitates communication between Students, Training & Placement Officers (TPOs) throughout the placement drive lifecycle.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Routes](#-api-routes)
- [Frontend Routes](#-frontend-routes)
- [Database Schema](#-database-schema)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Project Overview

The **Placement Management System** is a modern web application that manages the entire placement ecosystem. It provides:

- **For Students**: Browse available drives, register for placements, track eligibility, and manage their profiles
- **For TPOs**: Create and manage placement drives, track student attendance, shortlist candidates, and maintain records
- **Centralized Management**: All placement drives, registrations, and outcomes in one unified platform

### Key Objectives:
- Automate the placement drive management process
- Provide real-time eligibility checking for students
- Enable efficient attendance tracking and candidate selection
- Maintain detailed records of all placement activities

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library for building interactive components |
| **Vite** | Lightning-fast build tool and dev server |
| **Redux Toolkit** | State management and async operations |
| **React Router v7** | Client-side routing and navigation |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Axios** | HTTP client with interceptors |
| **Lucide React** | Beautiful icon library |
| **shadcn/ui** | Pre-built reusable UI components |

### Backend

| Technology | Purpose |
|-----------|---------|
| **FastAPI** | Modern, fast Python web framework |
| **Python 3.9+** | Backend programming language |
| **SQLite** | Lightweight relational database |
| **Pydantic** | Data validation using Python type hints |
| **JWT** | Secure token-based authentication |
| **CORS** | Cross-origin resource sharing middleware |

---

## ✨ Features

### Student Features
- ✅ User authentication (Signup/Login)
- ✅ Academic profile management (USN, Branch, CGPA, Backlogs, etc.)
- ✅ View all available placement drives
- ✅ Real-time eligibility checking
- ✅ Register for placement drives
- ✅ Track registration status
- ✅ View detailed drive information

### TPO Features
- ✅ User authentication (Signup/Login)
- ✅ TPO profile management
- ✅ Create new placement drives with eligibility criteria
- ✅ Edit drives
- ✅ View registered students for each drive
- ✅ Mark attendance for students
- ✅ Shortlist/Reject candidates
- ✅ Dashboard with key statistics

### Common Features
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Responsive design
- ✅ Error handling and validation
- ✅ Loading states and notifications

---

## 📂 Project Structure

```
placement_system/
│
├── frontend/                          # React + Vite Frontend
│   ├── src/
│   │   ├── api/                       # API utilities
│   │   │   ├── axios.js              # Axios instance with interceptors
│   │   │   └── userApi.js            # User API calls
│   │   │
│   │   ├── assets/                    # Static assets
│   │   │
│   │   ├── components/                # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx      # Authentication wrapper
│   │   │   ├── ProtectedRoute.jsx    # Role-based access
│   │   │   ├── loaders/
│   │   │   │   └── Spinner.jsx
│   │   │   └── ui/                    # shadcn/ui components
│   │   │       └── card.jsx
│   │   │
│   │   ├── hooks/                     # Custom React hooks
│   │   │   ├── useFetch.js
│   │   │   ├── usePagination.js
│   │   │   └── useRole.js
│   │   │
│   │   ├── lib/                       # Utility functions
│   │   │   └── utils.js
│   │   │
│   │   ├── pages/                     # Route pages
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── student/
│   │   │   │   ├── ProfileStudent.jsx
│   │   │   │   ├── Drives.jsx
│   │   │   │   ├── SingleDrive.jsx
│   │   │   │   └── DriveRegister.jsx
│   │   │   ├── tpo/
│   │   │   │   ├── ProfileTPO.jsx
│   │   │   │   ├── TPODashboard.jsx
│   │   │   │   ├── DriveList.jsx
│   │   │   │   ├── DriveDetails.jsx
│   │   │   │   ├── CreateDrive.jsx
│   │   │   │   ├── EditDrive.jsx
│   │   │   │   └── DriveAttendance.jsx
│   │   │   ├── layouts/
│   │   │   │   ├── StudentLayout.jsx
│   │   │   │   └── TPOLayout.jsx
│   │   │   └── errors/
│   │   │       ├── Error.jsx          # 404 page
│   │   │       └── Unauthorized.jsx   # 401 page
│   │   │
│   │   ├── redux/                     # State management
│   │   │   ├── store.js
│   │   │   ├── api/
│   │   │   │   └── userApi.js
│   │   │   └── reducers/
│   │   │       └── userReducer.js
│   │   │
│   │   ├── utils/                     # Helper utilities
│   │   │   ├── localStorageUtils.js
│   │   │   └── getRoute.js
│   │   │
│   │   ├── App.jsx                    # Main app component
│   │   ├── index.css                  # Tailwind styles
│   │   └── main.jsx                   # Entry point
│   │
│   ├── .env.development.local         # Development environment
│   ├── .env.production.local          # Production environment
│   ├── components.json                # shadcn/ui config
│   ├── eslint.config.js
│   ├── jsconfig.json
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── backend/                           # FastAPI Backend
    ├── controllers/                   # Business logic
    │   ├── user_controller.py         # Auth & profile
    │   ├── student_controller.py      # Student operations
    │   ├── drives_controller.py       # Drive management
    │   ├── student_drive_controller.py # Registration & attendance
    │   └── tpo_controller.py          # TPO operations
    │
    ├── core/                          # Core configurations
    │   ├── config.py                  # Settings
    │   └── security.py                # Security rules
    │
    ├── db/                            # Database
    │   ├── connect.py                 # DB connection
    │   └── models/
    │       └── tables.py              # Table schemas
    │
    ├── middlewares/                   # Custom middlewares
    │   └── auth_middleware.py         # JWT validation
    │
    ├── models/                        # Pydantic models
    │   ├── user_auth.py              # Auth schemas
    │   ├── student.py                # Student schema
    │   ├── tpo.py                    # TPO schema
    │   ├── drive_models.py           # Drive schemas
    │   ├── student_drive_models.py   # Registration schemas
    │   └── utils_models.py           # Utility models
    │
    ├── routes/                        # API endpoints
    │   ├── user_routes.py            # Auth routes
    │   ├── student_router.py         # Student routes
    │   ├── tpo_router.py             # TPO routes
    │   ├── drives_router.py          # Drive routes
    │   └── student_drive_router.py   # Registration routes
    │
    ├── utils/                         # Utilities
    │   ├── user_auth.py              # Auth helpers
    │   ├── eligibility.py            # Eligibility checks
    │   └── custom_openapi.py         # API docs
    │
    ├── main.py                        # Application entry point
    ├── requirements.txt               # Python dependencies
    ├── .env                          # Environment variables
    └── .gitignore
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16+) and **npm**
- **Python** (3.9+) and **pip**
- **Git**

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt


# Run the server
uvicorn main:app --reload
```

**Backend runs on:** `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

---

## 🔌 API Routes

### Base URL: `http://localhost:8000/api/v1`

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/user/signup` | Create new user account | ❌ |
| POST | `/user/login` | User login | ❌ |
| GET | `/user/profile` | Get user profile | ✅ |

### Student Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/user/student/profile` | Create/Update student profile | ✅ |

### TPO Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/user/tpo/profile` | Create/Update TPO profile | ✅ |

### Drive Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/drives/` | List all drives | ❌ |
| GET | `/drives/{drive_id}` | Get single drive details | ❌ |
| POST | `/drives/` | Create new drive | ✅ (TPO) |
| PUT | `/drives/{drive_id}` | Update drive | ✅ (TPO) |
| DELETE | `/drives/{drive_id}` | Delete drive | ✅ (TPO) |

### Drive Management Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/student-drive/{drive_id}/register` | Register for drive | ✅ (Student) |
| GET | `/student-drive/{drive_id}/registrations` | Get registered students | ✅ (TPO) |
| GET | `/student-drive/{drive_id}/attendance` | Get attendance list | ✅ (TPO) |
| POST | `/student-drive/{drive_id}/attendance/{student_id}` | Mark attendance | ✅ (TPO) |
| POST | `/student-drive/{drive_id}/shortlist/{student_id}` | Update shortlist status | ✅ (TPO) |

---

## 🛣️ Frontend Routes

### Public Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home.jsx` | Landing page with featured drives |
| `/login` | `auth/Login.jsx` | User login page |
| `/signup` | `auth/Signup.jsx` | User registration page |
| `/401` | `errors/Unauthorized.jsx` | Unauthorized access page |
| `/*` | `errors/Error.jsx` | 404 Not Found page |

### Student Routes

| Path | Component | Description | Protected |
|------|-----------|-------------|-----------|
| `/student/profile` | `student/ProfileStudent.jsx` | Student profile management | ✅ |
| `/student/drives` | `student/Drives.jsx` | List all placement drives | ✅ |
| `/student/drives/:id` | `student/SingleDrive.jsx` | View drive details | ✅ |
| `/student/drive/register/:drive_id` | `student/DriveRegister.jsx` | Register for drive | ✅ |

### TPO Routes

| Path | Component | Description | Protected |
|------|-----------|-------------|-----------|
| `/tpo` | `tpo/TPODashboard.jsx` | TPO dashboard with stats | ✅ |
| `/tpo/profile` | `tpo/ProfileTPO.jsx` | TPO profile management | ✅ |
| `/tpo/drives` | `tpo/DriveList.jsx` | List all drives | ✅ |
| `/tpo/drives/create` | `tpo/CreateDrive.jsx` | Create new drive | ✅ |
| `/tpo/drives/:id` | `tpo/DriveDetails.jsx` | View drive details | ✅ |
| `/tpo/drives/:id/edit` | `tpo/EditDrive.jsx` | Edit drive information | ✅ |
| `/tpo/drives/:drive_id/attendance` | `tpo/DriveAttendance.jsx` | Mark attendance | ✅ |

---

## 💾 Database Schema

### Tables

#### `users`
```sql
id (INTEGER, PRIMARY KEY)
name (TEXT)
email (TEXT, UNIQUE)
password_hash (TEXT)
role (TEXT) -- 'student', 'tpo', 'admin'
created_at (TEXT)
```

#### `students`
```sql
id (INTEGER, PRIMARY KEY, FK → users.id)
usn (TEXT, UNIQUE)
branch (TEXT)
year (INTEGER)
cgpa (REAL)
backlogs (INTEGER)
tenth_percent (REAL)
twelfth_percent (REAL)
created_at (TEXT)
updated_at (TEXT)
```

#### `tpos`
```sql
id (INTEGER, PRIMARY KEY, FK → users.id)
designation (TEXT)
phone (TEXT)
department (TEXT)
created_at (TEXT)
updated_at (TEXT)
```

#### `company_drives`
```sql
id (INTEGER, PRIMARY KEY)
company_name (TEXT)
role (TEXT)
ctc (TEXT)
job_location (TEXT)
drive_date (TEXT)
registration_deadline (TEXT)
rounds_info (TEXT)
min_cgpa (REAL)
allowed_branches (TEXT) -- CSV format
min_year (INTEGER)
max_backlogs (INTEGER)
min_tenth_percent (REAL)
min_twelfth_percent (REAL)
created_by (INTEGER, FK → users.id)
created_at (TEXT)
```

#### `drive_registrations`
```sql
id (INTEGER, PRIMARY KEY)
drive_id (INTEGER, FK → company_drives.id)
student_id (INTEGER, FK → students.id)
registration_date (TEXT)
status (TEXT) -- 'registered', 'cancelled'
UNIQUE(drive_id, student_id)
```

#### `drive_attendance`
```sql
drive_id (INTEGER, FK → company_drives.id)
student_id (INTEGER, FK → students.id)
attended (INTEGER) -- 0: Absent, 1: Present
shortlist_status (TEXT) -- 'pending', 'selected', 'rejected'
updated_at (TEXT)
UNIQUE(drive_id, student_id)
```

---

## 🔐 Environment Variables

### Backend (`.env`)

```env
# JWT Configuration
JWT_SECRET_KEY=your_secret_key_here
JWT_EXPIRE_TIME=3600
JWT_TOKEN_NAME=token

# Environment
ENV=DEV  # DEV or PROD
```

### Frontend (`.env.development.local`)

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Frontend (`.env.production.local`)

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
```

---

## 👨‍💻 Development

### Available Scripts

#### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

#### Backend

```bash
# Start development server with hot reload
uvicorn main:app --reload

# Run with specific host/port
uvicorn main:app --host 0.0.0.0 --port 8000

# Access API documentation
# Swagger UI: http://localhost:8000/docs
# ReDoc: http://localhost:8000/redoc
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For support, email nishantmoolya@gmail.com or open an issue on the GitHub repository.

---

**Happy Coding! 🎉**
