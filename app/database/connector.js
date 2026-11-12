const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = db;