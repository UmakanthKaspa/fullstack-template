#!/usr/bin/env node

/**
 * Interactive Setup Wizard
 * Asks for MySQL credentials, creates database, creates admin user
 */

const readline = require('readline');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Ask question
function ask(question) {
  return new Promise((resolve) => {
    rl.question(colors.yellow + question + colors.reset, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Ask password (hidden)
function askPassword(question) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    const stdout = process.stdout;

    stdout.write(colors.yellow + question + colors.reset);

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    let password = '';

    stdin.on('data', function onData(char) {
      if (char === '\n' || char === '\r' || char === '\u0004') {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener('data', onData);
        stdout.write('\n');
        resolve(password);
      } else if (char === '\u0003') {
        process.exit();
      } else if (char === '\b' || char === '\x7f') {
        if (password.length > 0) {
          password = password.slice(0, -1);
          stdout.write('\b \b');
        }
      } else {
        password += char;
        stdout.write('*');
      }
    });
  });
}

// Update .env file
function updateEnvFile(dbConfig, adminUser) {
  const envPath = path.join(__dirname, 'backend', '.env');

  const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=${dbConfig.rootPassword}
DB_NAME=${dbConfig.dbName}
DB_PORT=3306

# JWT Secret
JWT_SECRET=my_super_secret_jwt_key_change_this_in_production_123456
JWT_EXPIRES_IN=24h
`;

  fs.writeFileSync(envPath, envContent);
  console.log(colors.green + '✓ Created backend/.env file' + colors.reset);
}

// Main setup function
async function setup() {
  console.log(colors.cyan + '\n========================================' + colors.reset);
  console.log(colors.cyan + '  Fullstack Template - Setup Wizard' + colors.reset);
  console.log(colors.cyan + '========================================\n' + colors.reset);

  try {
    // Step 1: MySQL credentials
    console.log(colors.blue + 'Step 1: MySQL Connection' + colors.reset);
    const mysqlUser = await ask('MySQL username (usually "root"): ') || 'root';
    const mysqlPassword = await askPassword('MySQL password: ');

    // Step 2: Database name
    console.log(colors.blue + '\nStep 2: Database Settings' + colors.reset);
    const dbName = await ask('Database name to create (default: fullstack_template): ') || 'fullstack_template';

    // Step 3: Admin user
    console.log(colors.blue + '\nStep 3: Create Admin User' + colors.reset);
    const adminUsername = await ask('Admin username (default: admin): ') || 'admin';
    const adminEmail = await ask('Admin email (default: admin@example.com): ') || 'admin@example.com';
    const adminPassword = await askPassword('Admin password: ');

    rl.close();

    console.log(colors.blue + '\n→ Connecting to MySQL...' + colors.reset);

    // Connect to MySQL
    const connection = mysql.createConnection({
      host: 'localhost',
      user: mysqlUser,
      password: mysqlPassword,
      multipleStatements: true
    });

    connection.connect((err) => {
      if (err) {
        console.error(colors.red + '✗ Failed to connect to MySQL!' + colors.reset);
        console.error(colors.red + 'Error: ' + err.message + colors.reset);
        console.log(colors.yellow + '\nPlease check:' + colors.reset);
        console.log('  - MySQL is running: sudo systemctl start mysql');
        console.log('  - Username and password are correct\n');
        process.exit(1);
      }

      console.log(colors.green + '✓ Connected to MySQL' + colors.reset);
      console.log(colors.blue + '→ Creating database and table...' + colors.reset);

      // Hash admin password
      const hashedPassword = bcrypt.hashSync(adminPassword, 10);

      // SQL queries
      const sql = `
        CREATE DATABASE IF NOT EXISTS ${dbName};
        USE ${dbName};

        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) NOT NULL UNIQUE,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        INSERT INTO users (username, email, password) VALUES
        ('${adminUsername}', '${adminEmail}', '${hashedPassword}')
        ON DUPLICATE KEY UPDATE password='${hashedPassword}', email='${adminEmail}';
      `;

      connection.query(sql, (err, results) => {
        if (err) {
          console.error(colors.red + '✗ Error creating database!' + colors.reset);
          console.error(colors.red + 'Error: ' + err.message + colors.reset);
          connection.end();
          process.exit(1);
        }

        console.log(colors.green + '✓ Database created: ' + dbName + colors.reset);
        console.log(colors.green + '✓ Users table created' + colors.reset);
        console.log(colors.green + '✓ Admin user created' + colors.reset);

        // Update .env file
        updateEnvFile({
          rootPassword: mysqlPassword,
          dbName: dbName
        }, {
          username: adminUsername,
          email: adminEmail
        });

        connection.end();

        // Success message
        console.log(colors.cyan + '\n========================================' + colors.reset);
        console.log(colors.green + '  ✓ Setup Complete!' + colors.reset);
        console.log(colors.cyan + '========================================\n' + colors.reset);

        console.log(colors.yellow + 'Database:' + colors.reset + ' ' + dbName);
        console.log(colors.yellow + 'Admin User:' + colors.reset + ' ' + adminUsername);
        console.log(colors.yellow + 'Admin Email:' + colors.reset + ' ' + adminEmail);
        console.log(colors.yellow + 'Password:' + colors.reset + ' ' + adminPassword);

        console.log(colors.cyan + '\n========================================' + colors.reset);
        console.log(colors.green + '  Next Steps:' + colors.reset);
        console.log(colors.cyan + '========================================\n' + colors.reset);

        console.log('1. Install dependencies:');
        console.log(colors.blue + '   npm install' + colors.reset);
        console.log('\n2. Start the application:');
        console.log(colors.blue + '   npm start' + colors.reset);
        console.log('\n3. Open browser and login:');
        console.log(colors.blue + '   http://localhost:3000' + colors.reset);
        console.log(colors.yellow + '   Username: ' + colors.reset + adminUsername);
        console.log(colors.yellow + '   Password: ' + colors.reset + adminPassword + '\n');
      });
    });

  } catch (error) {
    console.error(colors.red + '\n✗ Setup failed: ' + error.message + colors.reset);
    rl.close();
    process.exit(1);
  }
}

setup();
