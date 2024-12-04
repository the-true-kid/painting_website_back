const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env

// Configure the connection pool using DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use a single environment variable for the URL
    ssl: {
        rejectUnauthorized: false, // Required for Render's external connections
    },
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
