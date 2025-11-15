#!/bin/bash

echo "=================================="
echo "Fullstack Template Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"
echo ""

# Backend setup
echo "Setting up backend..."
cd backend
npm install
echo "✓ Backend dependencies installed"
echo ""

# Frontend setup
echo "Setting up frontend..."
cd ../frontend
npm install
echo "✓ Frontend dependencies installed"
echo ""

cd ..

echo ""
echo "=================================="
echo "Dependencies Installed!"
echo "=================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Make sure MySQL is running"
echo ""
echo "2. Update backend/.env with your MySQL password if needed"
echo "   (Default password is empty)"
echo ""
echo "3. Set up the database automatically:"
echo "   cd backend && npm run setup-db"
echo ""
echo "   OR manually:"
echo "   mysql -u root -p < backend/database/schema.sql"
echo ""
echo "4. Start the backend:"
echo "   cd backend && npm start"
echo ""
echo "5. In a new terminal, start the frontend:"
echo "   cd frontend && npm start"
echo ""
echo "6. Open http://localhost:3000 and login with:"
echo "   Username: admin  |  Password: password123"
echo ""
echo "See CREDENTIALS.md for all login details!"
echo ""
