# Super Simple Setup Guide

## 3 Steps Only!

### Step 1: Create Database Manually

```bash
mysql -u root -p < create-database.sql
```

Enter your MySQL password when asked. That's it!

**Or do it manually in MySQL:**

```sql
CREATE DATABASE fullstack_template;
```

### Step 2: Update Database Password

Edit `backend/.env` file:

```bash
nano backend/.env
```

Change only this line:
```env
DB_PASSWORD=your_mysql_password
```

Save and exit (Ctrl+X, Y, Enter)

### Step 3: Run Everything!

```bash
npm install
npm start
```

**Done!** 🎉

- Frontend + Backend both start together
- Auto-detects free ports (no port conflicts!)
- Browser opens automatically
- Login: **admin** / **password123**

## What Happens:

1. ✅ Checks if port 5000 is free, if not uses 5001, 5002, etc.
2. ✅ Checks if port 3000 is free, if not uses 3001, 3002, etc.
3. ✅ Starts backend server
4. ✅ Starts frontend server
5. ✅ Shows you the URLs to access

## Stop Both Servers:

Press `Ctrl+C` once - stops both!

## Troubleshooting:

**Database error?**
- Make sure MySQL is running: `sudo systemctl start mysql`
- Check password in `backend/.env`

**Dependencies error?**
- Run: `npm run setup` first

**Port still busy?**
- The script will automatically find free ports!

## Quick Commands:

```bash
# Setup (first time only)
npm run setup          # Install all dependencies

# Start everything
npm start              # Runs both frontend + backend

# Or use:
npm run dev            # Same as npm start
```

That's all you need to know! 🚀
