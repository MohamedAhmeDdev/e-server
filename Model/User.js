const { DataTypes } = require('sequelize');
const database = require('../config/database');

const User = database.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
},
{
  freezeTableName: true,
  timestamps: true,
});



database.sync().then(() => {
  console.log('user table created!');
}).catch(error => {
  console.error('Error syncing user', error);
});

module.exports = User;
