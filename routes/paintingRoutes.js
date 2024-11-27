const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database helper

// Get all paintings
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                id, 
                title, 
                description, 
                date_created, 
                price, 
                stock, 
                width, 
                height, 
                picture_url, 
                alt_text
            FROM paintings;
        `;
        const paintings = await db.query(query);

        res.json(paintings);
    } catch (error) {
        console.error('Error fetching paintings:', error);
        res.status(500).json({ error: 'An error occurred while fetching paintings' });
    }
});

// Get a single painting by ID
router.get('/:id', async (req, res) => {
    try {
        const query = `
            SELECT 
                id, 
                title, 
                description, 
                date_created, 
                price, 
                stock, 
                width, 
                height, 
                picture_url, 
                alt_text
            FROM paintings
            WHERE id = $1;
        `;
        const painting = await db.query(query, [req.params.id]);

        if (painting.length === 0) {
            return res.status(404).json({ error: 'Painting not found' });
        }

        res.json(painting[0]); // Return the single painting object
    } catch (error) {
        console.error('Error fetching painting:', error);
        res.status(500).json({ error: 'An error occurred while fetching the painting' });
    }
});

module.exports = router;
