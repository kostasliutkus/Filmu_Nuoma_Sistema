const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vezliukai', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
module.exports = sequelize;