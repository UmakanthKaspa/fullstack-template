# Fullstack Template - Super Simple Setup

## What This Is

A complete login system with:
- React frontend
- Node.js backend
- MySQL database

## Setup (First Time Only)

### 1. Run Setup Wizard

```bash
npm install
npm run wizard
```

**Answer questions:**
- MySQL username → `root`
- MySQL password → `your_password`
- Database name → Press Enter (uses default)
- Admin username → Press Enter (uses `admin`)
- Admin email → Press Enter (uses default)
- Admin password → Type your password

**Wizard creates everything automatically!**

### 2. Install Dependencies

```bash
npm run install-deps
```

## Run the App (Every Time)

```bash
npm start
```

- ✅ Starts backend + frontend together
- ✅ Auto-detects free ports
- ✅ Opens browser automatically

**Login with your admin username/password!**

**Stop:** Press `Ctrl+C`

---

## Commands Summary

| Command | What It Does |
|---------|-------------|
| `npm run wizard` | Setup wizard (first time only) |
| `npm run install-deps` | Install dependencies (first time only) |
| `npm start` | Start the app |

## Files You Might Edit

- `backend/.env` - Database settings
- `backend/src/routes/` - API routes
- `frontend/src/pages/` - React pages

## More Help

- **[HOW_TO_USE.txt](HOW_TO_USE.txt)** - Simple text instructions
- **[SETUP.md](SETUP.md)** - Detailed setup guide
- **[README.md](README.md)** - Full documentation

---

**That's all you need to know!** 🚀
