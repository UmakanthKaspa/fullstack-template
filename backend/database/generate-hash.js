// Quick script to generate bcrypt hash for passwords
// Run: node backend/database/generate-hash.js

const bcrypt = require('bcryptjs');

const password = 'password123';
const hash = bcrypt.hashSync(password, 10);

console.log('\nGenerated hash for password "password123":');
console.log(hash);
console.log('\nCopy this hash to use in your SQL or seed data\n');
