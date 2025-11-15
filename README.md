# Fullstack Template

A complete fullstack application template with Node.js/Express backend, React frontend, and MySQL database. Perfect for quickly bootstrapping new projects.

> 📖 **New to this template?** Read [START_HERE.md](START_HERE.md) or [QUICKSTART.md](QUICKSTART.md) for step-by-step setup instructions!

## Quick Start

```bash
# 1. Install dependencies
./setup.sh  # Linux/macOS
setup.bat   # Windows

# 2. Setup database (automatic!)
cd backend && npm run setup-db

# 3. Start backend
npm start

# 4. Start frontend (new terminal)
cd frontend && npm start

# 5. Login at http://localhost:3000
# Username: admin | Password: password123
```

See [CREDENTIALS.md](CREDENTIALS.md) for all demo users.

## Features

- **Backend**: Node.js + Express + MySQL
- **Frontend**: React with React Router
- **Authentication**: JWT-based login system
- **Database**: MySQL with user management
- **API**: RESTful API with ping/pong endpoint
- **Cross-platform**: Works on Windows, macOS, and Linux

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL2
- JWT (JSON Web Tokens)
- Bcrypt for password hashing
- CORS enabled
- dotenv for environment variables

### Frontend
- React 18
- React Router DOM
- Axios for HTTP requests
- Modern CSS styling

## Project Structure

```
fullstack-template/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js        # Database configuration
│   │   ├── controllers/
│   │   │   ├── authController.js  # Authentication logic
│   │   │   └── pingController.js  # Ping/Pong logic
│   │   ├── middleware/
│   │   │   └── auth.js            # JWT authentication middleware
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Auth routes
│   │   │   └── pingRoutes.js      # Ping routes
│   │   └── server.js              # Main server file
│   ├── database/
│   │   └── schema.sql             # Database schema
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/            # Reusable components
    │   ├── pages/
    │   │   ├── Login.js          # Login page
    │   │   └── Dashboard.js      # Dashboard with ping button
    │   ├── services/
    │   │   └── api.js            # API service layer
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Login.css
    │   │   └── Dashboard.css
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── .env.example
```

## Setup Instructions

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd fullstack-template
```

### 2. Database Setup

1. Start your MySQL server

2. **Option A: Automatic Setup (Recommended)**

   This will create database, tables, and insert dummy users automatically:
   ```bash
   cd backend
   npm run setup-db
   ```

   You'll see a success message with all login credentials!

3. **Option B: Manual Setup**

   ```bash
   mysql -u root -p < backend/database/schema.sql
   ```

The database includes:
- Database: `fullstack_template`
- Table: `users`
- Demo users: `admin`, `john`, `jane`, `demo` (all with password: `password123`)
- See [CREDENTIALS.md](CREDENTIALS.md) for complete list

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your database credentials
# Update DB_PASSWORD and JWT_SECRET at minimum

# Start the backend server
npm start

# For development with auto-restart
npm run dev
```

The backend server will start on `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start the frontend development server
npm start
```

The frontend will start on `http://localhost:3000`

## Usage

### Login

1. Open `http://localhost:3000` in your browser
2. Use the demo credentials:
   - Username: `admin`
   - Password: `password123`
3. Click "Login"

### Dashboard

After login, you'll be redirected to the dashboard where you can:
- See your user information
- Click the "Ping Server" button to test the API connection
- View the API response in JSON format
- Logout

## API Endpoints

### Public Endpoints

- `POST /api/auth/login` - User login
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```

- `GET /api/health` - Health check

### Protected Endpoints (Require JWT Token)

- `GET /api/ping` - Ping/Pong endpoint
  - Headers: `Authorization: Bearer <token>`

## Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=fullstack_template
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Cross-Platform Compatibility

This template works on:
- Windows 10/11
- macOS
- Linux (Ubuntu, Debian, etc.)

All npm scripts use cross-platform compatible commands.

## Deployment

### Backend

1. Set environment variables on your server
2. Install dependencies: `npm install --production`
3. Start server: `npm start`

### Frontend

1. Build the production bundle: `npm run build`
2. Serve the `build` folder with a static server (nginx, Apache, etc.)

### Database

1. Import `backend/database/schema.sql` on your production MySQL server
2. Update backend `.env` with production database credentials

## Security Notes

- Change `JWT_SECRET` to a strong random string in production
- Use HTTPS in production
- Update CORS settings for production domains
- Never commit `.env` files to version control
- Hash all passwords (already implemented with bcrypt)

## Troubleshooting

### Database Connection Failed
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists and schema is imported

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Check CORS settings in backend

### Login Not Working
- Ensure users table has data
- Check database connection
- Verify JWT_SECRET is set

## License

MIT

## Contributing

Feel free to submit issues and pull requests!
# fullstack-template
