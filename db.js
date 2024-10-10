const { Sequelize } = require('sequelize');

// Create a new Sequelize instance and connect to your database
const sequelize = new Sequelize('paintings_db', 'aaron', 'abc', {
    host: 'localhost',
    dialect: 'postgres',
});

// Test the connection to make sure Sequelize is working correctly
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
