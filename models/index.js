const Painting = require('./Painting');
const Picture = require('./Picture');

// Define relationships
Painting.hasMany(Picture, { foreignKey: 'painting_id', as: 'pictures' });
Picture.belongsTo(Painting, { foreignKey: 'painting_id', as: 'painting' });

module.exports = { Painting, Picture };
