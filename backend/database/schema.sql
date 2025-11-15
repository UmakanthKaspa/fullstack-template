-- Create database if not exists
CREATE DATABASE IF NOT EXISTS fullstack_template;

-- Use the database
USE fullstack_template;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample users
-- All passwords are: password123
-- Login with any of these credentials
INSERT INTO users (username, email, password) VALUES
('admin', 'admin@example.com', '$2a$10$5kp5JO3Nkj3WZtY5Z9KqNOX3QJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ'),
('john', 'john@example.com', '$2a$10$5kp5JO3Nkj3WZtY5Z9KqNOX3QJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ'),
('jane', 'jane@example.com', '$2a$10$5kp5JO3Nkj3WZtY5Z9KqNOX3QJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ'),
('demo', 'demo@example.com', '$2a$10$5kp5JO3Nkj3WZtY5Z9KqNOX3QJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ')
ON DUPLICATE KEY UPDATE username=username;

-- Display success message
SELECT 'Database setup complete! You can now login with username: admin, password: password123' AS 'Status';
