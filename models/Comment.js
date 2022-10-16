// Import model class, datatypes, and sequelize connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Declare comment class
class Comment extends Model {}

// Initialize table with columns
Comment.init(
  {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  comment_text: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [1]
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'user',
        key: 'id'
    }
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'post',
        key: 'id'
    }
  }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

// Export model
module.exports = Comment;