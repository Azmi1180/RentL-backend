const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rentl', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize; 