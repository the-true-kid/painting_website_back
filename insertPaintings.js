const { Painting, Picture } = require('./models');
const path = require('path');

async function insertPaintingsAndPictures() {
    // Define paintings data
    const paintingsData = [
        {
            title: 'Rugalech',
            description: 'This is a beautiful painting titled Rugalech.',
            date_created: new Date('2024-01-01'),
            price: 100.00,
            stock: 1,
            width: 50,
            height: 70,
        },
        {
            title: 'Rainforest',
            description: 'This is a beautiful painting titled Rainforest.',
            date_created: new Date('2024-01-01'),
            price: 100.00,
            stock: 1,
            width: 50,
            height: 70,
        },
        {
            title: 'Feather',
            description: 'This is a beautiful painting titled Feather.',
            date_created: new Date('2024-01-01'),
            price: 100.00,
            stock: 1,
            width: 50,
            height: 70,
        },
        {
            title: 'Olive Tree',
            description: 'This is a beautiful painting titled Olive Tree.',
            date_created: new Date('2024-01-01'),
            price: 100.00,
            stock: 1,
            width: 50,
            height: 70,
        },
        {
            title: 'Citrus',
            description: 'This is a beautiful painting titled Citrus.',
            date_created: new Date('2024-01-01'),
            price: 100.00,
            stock: 1,
            width: 50,
            height: 70,
        },
        {
            title: 'Shabbas Flowers',
            description: 'This is a beautiful painting titled Shabbas Flowers.',
            date_created: new Date('2024-01-01'),
            price: 100.00,
            stock: 1,
            width: 50,
            height: 70,
        },
        {
            title: 'Phoenix',
            description: 'This is a beautiful painting titled Phoenix.',
            date_created: new Date('2024-01-01'),
            price: 100.00,
            stock: 1,
            width: 50,
            height: 70,
        }
    ];

    // Loop through each painting and insert them individually
    for (const paintingData of paintingsData) {
        // Use findOrCreate to avoid duplicate paintings
        const [painting, created] = await Painting.findOrCreate({
            where: { title: paintingData.title },  // Check if painting exists by title
            defaults: paintingData  // If not found, create with this data
        });

        console.log(`Painting "${painting.title}" ${created ? 'created' : 'already exists'}`);

        // Update the picture URL to reflect the new /paintings path in public
        const pictureData = {
            painting_id: painting.id,
            picture_url: `/paintings/${paintingData.title.toLowerCase().replace(' ', '_')}.jpg`,  // Point to /paintings directory
            is_main: true,
            alt_text: `A painting of ${paintingData.title}.`
        };

        await Picture.findOrCreate({
            where: { painting_id: painting.id, is_main: true },  // Check by painting_id and is_main flag
            defaults: pictureData
        });

        console.log(`Main picture for painting "${painting.title}" added or already exists.`);
    }
}

insertPaintingsAndPictures();
