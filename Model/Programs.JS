const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Program = database.define('program', {
  program_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  program_name: {
    type: DataTypes.STRING,
  },
  code: {
    type: DataTypes.STRING,
  },
  disease: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },

},
{
  freezeTableName: true,
  timestamps: true,
});



database.sync().then(() => {
  console.log('program table created!');
}).catch(error => {
  console.error('Error syncing program', error);
});

module.exports = Program;
