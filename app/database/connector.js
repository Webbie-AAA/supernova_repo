const { Pool } = require('pg');
require('dotenv').config({ quiet: true });

const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = db;