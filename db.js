const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env

// Configure the connection pool using environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // Default to 5432 if not specified
});

// A helper function for querying the database
async function query(text, params) {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res.rows;
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    } finally {
        client.release();
    }
}

// Export the pool and query helper
module.exports = {
    query,
    pool,
};
