// Import comment model
const { Comment } = require('../models');

// Data we want to seed
const commentData = [
  {
    comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    user_id: 3,
    post_id: 1
  },
  {
    comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    user_id: 1,
    post_id: 2
  },
  {
    comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    user_id: 1,
    post_id: 3
  },
  {
    comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    user_id: 2,
    post_id: 3
  },
  {
    comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
    user_id: 3,
    post_id: 3
  }
];

// Function to seed above data into Comment model (table)
const seedComments = () => Comment.bulkCreate(commentData);

// Exports function
module.exports = seedComments;
