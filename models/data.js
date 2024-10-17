const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:./database.sqlite');
const Data = sequelize.define('Data', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = { sequelize, Data };
