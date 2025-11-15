#!/usr/bin/env node

/**
 * Start both frontend and backend with auto port detection
 */

const { spawn } = require('child_process');
const net = require('net');
const fs = require('fs');
const path = require('path');

// Colors for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Check if port is available
function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
}

// Find available port starting from given port
async function findAvailablePort(startPort, maxPort = startPort + 10) {
  for (let port = startPort; port < maxPort; port++) {
    const available = await checkPort(port);
    if (available) return port;
  }
  return null;
}

// Update .env file
function updateEnvFile(filePath, key, value) {
  try {
    let content = '';
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf8');
    }

    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(content)) {
      content = content.replace(regex, `${key}=${value}`);
    } else {
      content += `\n${key}=${value}\n`;
    }

    fs.writeFileSync(filePath, content);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Main function
async function start() {
  console.log(colors.cyan + '\n========================================' + colors.reset);
  console.log(colors.cyan + '  Fullstack Template Starter' + colors.reset);
  console.log(colors.cyan + '========================================\n' + colors.reset);

  // Find available ports
  console.log(colors.blue + '→ Checking available ports...' + colors.reset);

  const backendPort = await findAvailablePort(5000);
  const frontendPort = await findAvailablePort(3000);

  if (!backendPort || !frontendPort) {
    console.error(colors.red + '✗ Could not find available ports!' + colors.reset);
    process.exit(1);
  }

  console.log(colors.green + `✓ Backend will use port: ${backendPort}` + colors.reset);
  console.log(colors.green + `✓ Frontend will use port: ${frontendPort}` + colors.reset);

  // Update backend .env
  const backendEnvPath = path.join(__dirname, 'backend', '.env');
  updateEnvFile(backendEnvPath, 'PORT', backendPort);

  // Update frontend .env
  const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
  updateEnvFile(frontendEnvPath, 'PORT', frontendPort);
  updateEnvFile(frontendEnvPath, 'REACT_APP_API_URL', `http://localhost:${backendPort}/api`);

  console.log(colors.green + '\n✓ Configuration updated\n' + colors.reset);

  console.log(colors.cyan + '========================================' + colors.reset);
  console.log(colors.cyan + '  Starting Services...' + colors.reset);
  console.log(colors.cyan + '========================================\n' + colors.reset);

  // Start backend
  console.log(colors.magenta + '→ Starting backend server...' + colors.reset);
  const backend = spawn('npm', ['start'], {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit',
    shell: true
  });

  // Wait a bit for backend to start
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Start frontend
  console.log(colors.magenta + '→ Starting frontend server...' + colors.reset);
  const frontend = spawn('npm', ['start'], {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, BROWSER: 'none' }
  });

  // Wait a bit then show access info
  setTimeout(() => {
    console.log(colors.cyan + '\n========================================' + colors.reset);
    console.log(colors.green + '  ✓ Services Running!' + colors.reset);
    console.log(colors.cyan + '========================================\n' + colors.reset);
    console.log(colors.yellow + '  Frontend: ' + colors.reset + colors.green + `http://localhost:${frontendPort}` + colors.reset);
    console.log(colors.yellow + '  Backend:  ' + colors.reset + colors.green + `http://localhost:${backendPort}` + colors.reset);
    console.log(colors.cyan + '\n========================================' + colors.reset);
    console.log(colors.yellow + '  Login: ' + colors.reset + 'admin / password123');
    console.log(colors.cyan + '========================================\n' + colors.reset);
    console.log(colors.yellow + 'Press Ctrl+C to stop both servers\n' + colors.reset);
  }, 5000);

  // Handle cleanup
  process.on('SIGINT', () => {
    console.log(colors.yellow + '\n\n→ Stopping servers...' + colors.reset);
    backend.kill();
    frontend.kill();
    process.exit(0);
  });
}

start();
