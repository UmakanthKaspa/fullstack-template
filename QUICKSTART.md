# Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

- Node.js (v14+) - [Download here](https://nodejs.org/)
- MySQL (v5.7+) - [Download here](https://dev.mysql.com/downloads/)
- npm (comes with Node.js)

## Step-by-Step Setup

### Step 1: Install Dependencies

**On Linux/macOS:**
```bash
./setup.sh
```

**On Windows:**
```batch
setup.bat
```

**Or manually:**
```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### Step 2: Configure Database Connection

Edit `backend/.env` and set your MySQL password:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=fullstack_template
```

**Note:** If your MySQL root password is empty, leave it blank.

### Step 3: Create Database & Tables (AUTOMATIC)

This will automatically create the database, tables, and insert dummy users:

```bash
cd backend
npm run setup-db
```

You should see:
```
✓ Database created: fullstack_template
✓ Users table created
✓ Dummy users inserted

You can login with any of these credentials:
  Username: admin  | Password: password123
  Username: john   | Password: password123
  Username: jane   | Password: password123
  Username: demo   | Password: password123
```

**Alternative (Manual):**
```bash
mysql -u root -p < backend/database/schema.sql
```

### Step 4: Start the Backend Server

```bash
cd backend
npm start
```

You should see:
```
✓ Database connected successfully
✓ Server is running on port 5000
✓ API available at http://localhost:5000/api
```

### Step 5: Start the Frontend (New Terminal)

```bash
cd frontend
npm start
```

Browser will automatically open at `http://localhost:3000`

### Step 6: Login!

The login page will appear automatically. Use these credentials:

- **Username:** `admin`
- **Password:** `password123`

Click "Login" button.

### Step 7: Test the Ping API

After login, you'll see the dashboard with:
1. Your username and email displayed
2. A "Ping Server" button

Click "Ping Server" to test the backend API connection!

## What You'll See

1. **Login Page** - Clean, modern login form
2. **Dashboard** - Shows user info and ping button
3. **Ping Response** - JSON response from backend in a nice format

## All Login Credentials

See [CREDENTIALS.md](CREDENTIALS.md) for complete list of demo users.

## Troubleshooting

### Database connection error?
- ✓ Make sure MySQL is running
- ✓ Check `backend/.env` has correct password
- ✓ Run `npm run setup-db` from backend folder

### Port 5000 already in use?
- Change `PORT=5000` to `PORT=5001` in `backend/.env`

### Port 3000 already in use?
- When prompted, press `Y` to run on different port

### Can't login?
- Make sure database setup completed successfully
- Check backend terminal for errors
- Verify backend is running on port 5000

## Next Steps

- Read [README.md](README.md) for detailed documentation
- Read [CREDENTIALS.md](CREDENTIALS.md) for all demo users
- Modify the code for your project
- Add new features and routes
- Deploy to production

## Quick Commands Reference

```bash
# Setup database
cd backend && npm run setup-db

# Start backend
cd backend && npm start

# Start frontend
cd frontend && npm start

# Run backend in dev mode (auto-restart)
cd backend && npm run dev
```

Enjoy coding! 🚀
