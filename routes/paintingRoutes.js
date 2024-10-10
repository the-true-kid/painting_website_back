const express = require('express');
const router = express.Router();
const { Painting, Picture } = require('../models');

// Get all paintings with their associated main pictures, with optional limit
router.get('/', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;  // Check if limit is provided

    try {
        const paintings = await Painting.findAll({
            include: [
                {
                    model: Picture,
                    as: 'pictures',
                    where: { is_main: true },  // Only include the main picture
                    attributes: ['picture_url', 'alt_text'],  // Only return picture details
                }
            ],
            limit: limit  // Apply limit if provided in the query params
        });
        res.json(paintings);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching paintings' });
    }
});

// Get a single painting by ID with all associated pictures
router.get('/:id', async (req, res) => {
    try {
        const painting = await Painting.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: Picture,
                    as: 'pictures',
                    attributes: ['picture_url', 'alt_text', 'is_main'],  // Return all pictures for the painting
                }
            ]
        });

        if (!painting) {
            return res.status(404).json({ error: 'Painting not found' });
        }

        res.json(painting);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the painting' });
    }
});

module.exports = router;
