const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Client = database.define('client', {
  client_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  date_of_birth: {
    type: DataTypes.DATE,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
},
{
  freezeTableName: true,
  timestamps: true,
});



database.sync().then(() => {
  console.log('client table created!');
}).catch(error => {
  console.error('Error syncing client', error);
});

module.exports = Client;
