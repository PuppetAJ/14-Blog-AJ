// Imports ProductTag model
const { Post } = require('../models');

// Data we want to insert
const postData = [
  {
    title: 'Why MVC is so important',
    post_text: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
    user_id: 2
  },
  {
    title: 'Authentication vs Authorization',
    post_text: 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.',
    user_id: 2
  },
  {
    title: 'Object-Relational Mapping',
    post_text: 'I have really loved learning about ORMs. It\'s really simplified the way i create queries in SQL!',
    user_id: 3
  }
];

// Function to seed Post model (table)
const seedPosts = () => Post.bulkCreate(postData);

// Export function
module.exports = seedPosts;
