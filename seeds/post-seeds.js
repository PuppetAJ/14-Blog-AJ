// Imports ProductTag model
const { Post } = require('../models');

// Data we want to insert
const postData = [
  {
    title: 'test title',
    post_text: 'test text',
    user_id: 1
  }
];

// Function to seed Post model (table)
const seedPosts = () => Post.bulkCreate(postData);

// Export function
module.exports = seedPosts;
