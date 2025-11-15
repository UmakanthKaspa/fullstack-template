# Login Credentials

## Demo Users

All users have the same password for easy testing.

### Available Users:

| Username | Email              | Password    | Role        |
|----------|--------------------|-------------|-------------|
| admin    | admin@example.com  | password123 | Admin       |
| john     | john@example.com   | password123 | Regular User|
| jane     | jane@example.com   | password123 | Regular User|
| demo     | demo@example.com   | password123 | Demo User   |

## Quick Test

1. Open: `http://localhost:3000`
2. Enter username: `admin`
3. Enter password: `password123`
4. Click "Login"

## After Login

You will see:
- Welcome message with your username and email
- A "Ping Server" button to test the API
- Logout button

Click the "Ping Server" button to test the backend connection!

## Database Configuration

Make sure your `backend/.env` file has correct MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=fullstack_template
```

## Adding New Users

You can add users in two ways:

### Method 1: Using SQL
```sql
USE fullstack_template;

-- Password will be 'password123'
INSERT INTO users (username, email, password) VALUES
('newuser', 'newuser@example.com', '$2a$10$5kp5JO3Nkj3WZtY5Z9KqNOX3QJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ');
```

### Method 2: Using Node.js Script
```bash
# Generate a hash for a new password
node backend/database/generate-hash.js
```

Then copy the hash to your SQL INSERT statement.

## Security Note

⚠️ **IMPORTANT**: These are demo credentials for development only!

In production:
- Change all passwords
- Remove demo users
- Use strong, unique passwords
- Enable additional security measures
- Never commit real credentials to Git
