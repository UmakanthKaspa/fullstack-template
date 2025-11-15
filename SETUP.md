# Setup Instructions

## First Time Setup (2 Commands)

### Command 1: Install & Run Setup Wizard
```bash
npm install
npm run wizard
```

**The wizard will ask you:**
1. MySQL username (usually: root)
2. MySQL password
3. Database name (press Enter for default: fullstack_template)
4. Admin username (press Enter for default: admin)
5. Admin email (press Enter for default: admin@example.com)
6. Admin password (create your password)

**The wizard will automatically:**
- ✅ Create the database
- ✅ Create users table
- ✅ Insert your admin user
- ✅ Update backend/.env file

### Command 2: Install Dependencies
```bash
npm run install-deps
```

This installs all frontend and backend dependencies.

## Run the Application (1 Command)

```bash
npm start
```

**This will:**
- ✅ Start backend server
- ✅ Start frontend server
- ✅ Auto-detect free ports (no port conflicts!)
- ✅ Show you the URLs to access

**To Stop:** Press `Ctrl+C` (stops both servers)

## Login

Open the URL shown (usually http://localhost:3000)

Login with the credentials you created in the wizard!

## That's It!

---

## Example Run:

```bash
# First time
npm install
npm run wizard
# Answer the questions
npm run install-deps
npm start

# Every other time
npm start
```

## Troubleshooting

**MySQL not running?**
```bash
sudo systemctl start mysql
```

**Forgot password?**
Run the wizard again: `npm run wizard`

**Want to change database?**
Edit `backend/.env` file
