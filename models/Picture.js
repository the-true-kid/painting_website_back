const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Picture = sequelize.define('Picture', {
    painting_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Paintings',  // Reference the Painting model
            key: 'id'
        },
        allowNull: false
    },
    picture_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_main: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    alt_text: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false
});

module.exports = Picture;
