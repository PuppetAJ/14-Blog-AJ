// Import model class, datatypes, and sequelize connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Declare post class
class Post extends Model {};

// Initialize table with columns
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user',
          key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

// Export model
module.exports = Post;