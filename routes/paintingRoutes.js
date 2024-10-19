const express = require('express');
const router = express.Router();
const { Painting, Picture } = require('../models');

// Get all paintings with their associated main pictures
router.get('/', async (req, res) => {
    try {
        const paintings = await Painting.findAll({
            include: [
                {
                    model: Picture,
                    as: 'pictures',
                    where: { is_main: true },
                    attributes: ['picture_url', 'alt_text'],
                }
            ]
        });
        res.json(paintings);
    } catch (error) {
        console.error('Error fetching paintings:', error);
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
                    attributes: ['picture_url', 'alt_text', 'is_main'],
                }
            ]
        });

        if (!painting) {
            return res.status(404).json({ error: 'Painting not found' });
        }

        res.json(painting);
    } catch (error) {
        console.error('Error fetching painting:', error);
        res.status(500).json({ error: 'An error occurred while fetching the painting' });
    }
});

module.exports = router;
