const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Painting = sequelize.define('Painting', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    date_created: {
        type: DataTypes.DATE,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    width: {
        type: DataTypes.INTEGER,
    },
    height: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: true
});

module.exports = Painting;
