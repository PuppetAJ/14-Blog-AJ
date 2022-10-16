// Import model class, datatypes, bcrypt, and sequelize connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Declare user class
class User extends Model {
  // checkPassword function for checking if inputted password is the same as hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize table with columns
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
    // Declare hooks to be used before certain actions
    hooks: {
      async beforeBulkCreate(newUsersData) {
        // Before bulk user creation, each password must be hashed
        hashedUsersData = [];
        for (i=0; i < newUsersData.length; i++) {
          newUsersData[i].password = await bcrypt.hash(newUsersData[i].password, 10);
          hashedUsersData.push(newUsersData[i]);
        }
        return hashedUsersData;
      },
      async beforeCreate(newUserData) {
        // Before user creation, their password must be hashed
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        // Before a user being updated in the database, their new password must be hashed
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

// Export model
module.exports = User;