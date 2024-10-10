const express = require('express');
const cors = require('cors');  // Import the cors package
const path = require('path');  // Import path for resolving directories
const app = express();
const sequelize = require('./db');  // Sequelize instance
const { Painting, Picture } = require('./models');  // Import models

app.use(cors());

// Serve static files from the "public/paintings" directory
app.use('/static/paintings', express.static(path.join(__dirname, 'public/paintings')));

// Log to check if models are loaded
console.log(Painting === sequelize.models.Painting);  // Should log 'true'
console.log(Picture === sequelize.models.Picture);  // Should log 'true'

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello from your backend!');
});

// Routes
const paintingRoutes = require('./routes/paintingRoutes');
app.use('/api/paintings', paintingRoutes);  // Changed to avoid conflict with static route

// Start the server and sync the database
sequelize.sync({ force: false }).then(() => {  // Set force to false for production
    console.log('Database synced successfully');
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}).catch(err => {
    console.error('Error syncing database: ', err);
});
