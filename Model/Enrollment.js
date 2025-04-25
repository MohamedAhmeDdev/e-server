const { DataTypes } = require('sequelize');
const database = require('../config/database');
const Program = require('./Programs.JS');
const Client = require('./Clients');
const User = require('./User');

const Enrollment = database.define('enrollment', {
  enrollment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Client,
      key: 'client_id',
    },
  },
  program_id : {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Program,
      key: 'program_id',
    },
  },
  user_id : {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  medical_history: {
    type: DataTypes.TEXT, 
  },
  enrolled_on: {
    type: DataTypes.DATE,
  },

},
{
  freezeTableName: true,
  timestamps: true,
});

// Associations
Client.hasMany(Enrollment, { foreignKey: 'client_id' });
Enrollment.belongsTo(Client, { foreignKey: 'client_id' });

Program.hasMany(Enrollment, { foreignKey: 'program_id' });
Enrollment.belongsTo(Program, { foreignKey: 'program_id' });

User.hasMany(Enrollment, { foreignKey: 'user_id' });
Enrollment.belongsTo(User, { foreignKey: 'user_id' });

database.sync().then(() => {
  console.log('enrollment table created!');
}).catch(error => {
  console.error('Error syncing enrollment', error);
});

module.exports = Enrollment;
