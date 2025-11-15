#!/usr/bin/env node

/**
 * Automatic Database Setup Script
 * This script will create the database, tables, and insert dummy data
 *
 * Run: node backend/database/setup-database.js
 */

const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './backend/.env' });

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log('\n' + colors.cyan + '========================================' + colors.reset);
console.log(colors.cyan + '  Database Setup Script' + colors.reset);
console.log(colors.cyan + '========================================\n' + colors.reset);

// Create connection WITHOUT database selection (to create database first)
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error(colors.red + '✗ Error connecting to MySQL:' + colors.reset, err.message);
    console.log(colors.yellow + '\nPlease check:' + colors.reset);
    console.log('  1. MySQL is running');
    console.log('  2. Credentials in backend/.env are correct');
    console.log('  3. You have permission to create databases\n');
    process.exit(1);
  }

  console.log(colors.green + '✓ Connected to MySQL server' + colors.reset);
  setupDatabase();
});

async function setupDatabase() {
  const dbName = process.env.DB_NAME || 'fullstack_template';

  // Generate bcrypt hash for password
  const password = 'password123';
  const hashedPassword = bcrypt.hashSync(password, 10);

  const queries = [
    // Create database
    `CREATE DATABASE IF NOT EXISTS ${dbName}`,

    // Use database
    `USE ${dbName}`,

    // Create users table
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,

    // Insert dummy users (using prepared statements would be better, but this is for setup)
    `INSERT INTO users (username, email, password) VALUES
      ('admin', 'admin@example.com', '${hashedPassword}'),
      ('john', 'john@example.com', '${hashedPassword}'),
      ('jane', 'jane@example.com', '${hashedPassword}'),
      ('demo', 'demo@example.com', '${hashedPassword}')
    ON DUPLICATE KEY UPDATE username=username`
  ];

  console.log(colors.blue + '\n→ Creating database: ' + colors.reset + dbName);
  console.log(colors.blue + '→ Creating users table...' + colors.reset);
  console.log(colors.blue + '→ Inserting dummy data...\n' + colors.reset);

  connection.query(queries.join('; '), (err, results) => {
    if (err) {
      console.error(colors.red + '✗ Error setting up database:' + colors.reset, err.message);
      connection.end();
      process.exit(1);
    }

    console.log(colors.green + '✓ Database created: ' + colors.reset + dbName);
    console.log(colors.green + '✓ Users table created' + colors.reset);
    console.log(colors.green + '✓ Dummy users inserted\n' + colors.reset);

    // Display credentials
    console.log(colors.cyan + '========================================' + colors.reset);
    console.log(colors.cyan + '  Setup Complete!' + colors.reset);
    console.log(colors.cyan + '========================================\n' + colors.reset);

    console.log(colors.yellow + 'You can login with any of these credentials:\n' + colors.reset);
    console.log('  Username: ' + colors.green + 'admin' + colors.reset + '  | Password: ' + colors.green + 'password123' + colors.reset);
    console.log('  Username: ' + colors.green + 'john' + colors.reset + '   | Password: ' + colors.green + 'password123' + colors.reset);
    console.log('  Username: ' + colors.green + 'jane' + colors.reset + '   | Password: ' + colors.green + 'password123' + colors.reset);
    console.log('  Username: ' + colors.green + 'demo' + colors.reset + '   | Password: ' + colors.green + 'password123' + colors.reset);

    console.log(colors.cyan + '\n========================================\n' + colors.reset);

    connection.end();
  });
}
