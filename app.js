const express = require('express');
const app = express();
const paintingRoutes = require('./routes/paintingRoutes');
const cors = require('cors');
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving
app.use('/paintings', express.static(path.join(__dirname, 'public/paintings')));

// Routes
app.use('/api/paintings', paintingRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
