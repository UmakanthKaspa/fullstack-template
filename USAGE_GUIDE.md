# Usage Guide

## What Happens When You Start the App

### First Time Setup

1. **Install Dependencies** → Installs all required Node packages
2. **Setup Database** → Creates database, tables, and inserts dummy users
3. **Start Backend** → API server runs on port 5000
4. **Start Frontend** → React app runs on port 3000
5. **Open Browser** → Automatically opens `http://localhost:3000`

### What You See

#### 1. Login Page (First Screen)

The first page you see is a beautiful login form with:
- Username field
- Password field
- Login button
- Demo credentials displayed on the page

**No signup needed!** Use the pre-created demo accounts.

#### 2. After Login - Dashboard

Once logged in, you'll see:
- **Header**: Shows "Dashboard" and Logout button
- **Welcome Section**: Displays your username and email
- **Ping Section**: A button to test the backend API

#### 3. Ping Button Demo

Click "Ping Server" and you'll see:
```json
{
  "success": true,
  "message": "pong",
  "timestamp": "2025-11-15T05:30:00.000Z",
  "server": "Fullstack Template API"
}
```

This proves:
- ✅ Frontend is connected to backend
- ✅ Authentication is working (protected route)
- ✅ API is responding correctly

## How the Login Works

### Step by Step:

1. **User enters credentials** → Username: `admin`, Password: `password123`
2. **Frontend sends POST request** → To `/api/auth/login`
3. **Backend validates password** → Compares with hashed password in MySQL
4. **JWT token generated** → Signed with secret key
5. **Token sent to frontend** → Stored in localStorage
6. **User redirected** → To `/dashboard` route
7. **Dashboard loads** → Shows user info from token

### Protected Routes:

- **Frontend**: Dashboard requires token in localStorage
- **Backend**: Ping API requires valid JWT token in headers

If you try to access dashboard without login:
- ❌ Automatically redirected to login page

If you try to call ping API without token:
- ❌ Returns 401 Unauthorized error

## File Structure Explained

### Backend (`/backend`)

```
backend/
├── database/
│   ├── schema.sql           ← MySQL database structure
│   └── setup-database.js    ← Automatic setup script
├── src/
│   ├── config/
│   │   └── database.js      ← MySQL connection pool
│   ├── controllers/
│   │   ├── authController.js    ← Login logic
│   │   └── pingController.js    ← Ping API logic
│   ├── middleware/
│   │   └── auth.js          ← JWT verification
│   ├── routes/
│   │   ├── authRoutes.js    ← /api/auth/login
│   │   └── pingRoutes.js    ← /api/ping
│   └── server.js            ← Main server file
├── .env                     ← Your database config
└── package.json
```

### Frontend (`/frontend`)

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.js         ← Login page component
│   │   └── Dashboard.js     ← Dashboard page component
│   ├── services/
│   │   └── api.js           ← API calls (Axios)
│   ├── styles/
│   │   ├── Login.css        ← Login page styles
│   │   └── Dashboard.css    ← Dashboard styles
│   ├── App.js               ← Routes & protected routes
│   └── index.js             ← Entry point
└── package.json
```

## API Endpoints

### Public Endpoints

#### POST /api/auth/login
Login with username and password

**Request:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    }
  }
}
```

#### GET /api/health
Check if server is running

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-15T05:30:00.000Z"
}
```

### Protected Endpoints (Require JWT)

#### GET /api/ping
Test authenticated API call

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "pong",
  "timestamp": "2025-11-15T05:30:00.000Z",
  "server": "Fullstack Template API"
}
```

## Database Structure

### Users Table

| Column     | Type         | Description                    |
|------------|--------------|--------------------------------|
| id         | INT          | Primary key, auto increment    |
| username   | VARCHAR(50)  | Unique username                |
| email      | VARCHAR(100) | Unique email                   |
| password   | VARCHAR(255) | Bcrypt hashed password         |
| created_at | TIMESTAMP    | Account creation time          |
| updated_at | TIMESTAMP    | Last update time               |

### Sample Data

| ID | Username | Email              | Password (plain)   |
|----|----------|--------------------|--------------------|
| 1  | admin    | admin@example.com  | password123        |
| 2  | john     | john@example.com   | password123        |
| 3  | jane     | jane@example.com   | password123        |
| 4  | demo     | demo@example.com   | password123        |

Passwords are stored as bcrypt hashes in the database for security.

## How to Modify

### Add a New User (Database)

```sql
USE fullstack_template;

INSERT INTO users (username, email, password) VALUES
('newuser', 'newuser@example.com', 'hashed_password_here');
```

To hash a password, run:
```bash
node backend/database/generate-hash.js
```

### Add a New API Endpoint

1. **Create Controller** (`backend/src/controllers/myController.js`):
```javascript
const myFunction = (req, res) => {
  res.json({ message: 'Hello!' });
};

module.exports = { myFunction };
```

2. **Create Route** (`backend/src/routes/myRoutes.js`):
```javascript
const express = require('express');
const router = express.Router();
const { myFunction } = require('../controllers/myController');

router.get('/', myFunction);
module.exports = router;
```

3. **Register Route** (`backend/src/server.js`):
```javascript
const myRoutes = require('./routes/myRoutes');
app.use('/api/my-endpoint', myRoutes);
```

### Add a New Frontend Page

1. **Create Component** (`frontend/src/pages/MyPage.js`):
```javascript
import React from 'react';

function MyPage() {
  return <div>My New Page</div>;
}

export default MyPage;
```

2. **Add Route** (`frontend/src/App.js`):
```javascript
import MyPage from './pages/MyPage';

// In Routes:
<Route path="/my-page" element={<MyPage />} />
```

## Common Tasks

### Logout User
- Click "Logout" button
- Token removed from localStorage
- Redirected to login page

### Test API Without Frontend
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'

# Get token from response, then:
curl http://localhost:5000/api/ping \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Reset Database
```bash
cd backend
npm run setup-db
```

This will recreate tables and reset all users.

### Change Port

**Backend:**
Edit `backend/.env`:
```env
PORT=5001
```

**Frontend:**
Edit `frontend/package.json`:
```json
"proxy": "http://localhost:5001"
```

## Security Features

✅ **Password Hashing** - Bcrypt with salt rounds
✅ **JWT Tokens** - Signed and expires in 24h
✅ **Protected Routes** - Frontend and backend
✅ **SQL Injection Prevention** - Parameterized queries
✅ **CORS** - Configured for cross-origin requests
✅ **Environment Variables** - Sensitive data in .env

## Deployment Checklist

Before deploying to production:

- [ ] Change JWT_SECRET in .env
- [ ] Use strong MySQL password
- [ ] Change all user passwords
- [ ] Remove demo users
- [ ] Enable HTTPS
- [ ] Update CORS origins
- [ ] Set NODE_ENV=production
- [ ] Use environment variables (not .env file)
- [ ] Set up database backups
- [ ] Use PM2 or similar for Node.js

## Support & Resources

- **Quick Start:** [QUICKSTART.md](QUICKSTART.md)
- **Full Docs:** [README.md](README.md)
- **Credentials:** [CREDENTIALS.md](CREDENTIALS.md)
- **Project Info:** [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

Happy coding! 🚀
