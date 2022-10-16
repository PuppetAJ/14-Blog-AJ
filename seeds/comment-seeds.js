// Import comment model
const { Comment } = require('../models');

// Data we want to seed
const commentData = [
  {
    comment_text: 'Hello',
    user_id: 1,
    post_id: 1
  }
];

// Function to seed above data into Comment model (table)
const seedComments = () => Comment.bulkCreate(commentData);

// Exports function
module.exports = seedComments;
