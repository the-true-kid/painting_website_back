const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db');
const { Painting, Picture } = require('./models');

const app = express();

// Enable CORS for your frontend
app.use(cors({ origin: 'http://localhost:3000' }));

// Serve static files from the "public/paintings" directory
app.use('/static/paintings', express.static(path.join(__dirname, 'public/paintings')));

// Log to ensure models are loaded correctly
console.log(Painting === sequelize.models.Painting);  // Should log 'true'
console.log(Picture === sequelize.models.Picture);  // Should log 'true'

// Middleware to parse JSON
app.use(express.json());

// Test route to ensure the backend is working
app.get('/', (req, res) => {
    res.send('Hello from your backend!');
});

// Painting routes
const paintingRoutes = require('./routes/paintingRoutes');
app.use('/api/paintings', paintingRoutes);

// Sync database and start the server
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced successfully');
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});
