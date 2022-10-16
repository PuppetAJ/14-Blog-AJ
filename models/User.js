const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    // table column defs go here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: [4]
      }
    }
  },
  {
    hooks: {
      async beforeBulkCreate(newUsersData) {
        hashedUsersData = [];
        for (i=0; i < newUsersData.length; i++) {
          newUsersData[i].password = await bcrypt.hash(newUsersData[i].password, 10);
          hashedUsersData.push(newUsersData[i]);
        }
        return hashedUsersData;
      },
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    // Table config options go here
    // pass imported sequelize connection
    sequelize,
    // don't automatically create createdAt / updatedAt time fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;