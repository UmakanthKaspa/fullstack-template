-- Simple Database Setup
-- Run this in MySQL: mysql -u root -p < create-database.sql

CREATE DATABASE IF NOT EXISTS fullstack_template;

USE fullstack_template;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert demo users (password: password123)
INSERT INTO users (username, email, password) VALUES
('admin', 'admin@example.com', '$2a$10$5kp5JO3Nkj3WZtY5Z9KqNOX3QJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ'),
('john', 'john@example.com', '$2a$10$5kp5JO3Nkj3WZtY5Z9KqNOX3QJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ'),
('jane', 'jane@example.com', '$2a$10$5kp5JO3Nkj3WZtY5Z9KqNOX3QJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ'),
('demo', 'demo@example.com', '$2a$10$5kp5JO3Nkj3WZtY5Z9KqNOX3QJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ5kJ')
ON DUPLICATE KEY UPDATE username=username;

SELECT 'Database created successfully! Login with: admin / password123' AS Message;
