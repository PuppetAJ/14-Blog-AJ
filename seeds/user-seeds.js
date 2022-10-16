// import our model data
const { User } = require('../models');

// data we want to insert into model
const userData = [
  {
    username: 'testuser1',
    password: 'testpassword'
  },
  {
    username: 'Xandromus',
    password: 'testpassword'
  },
  {
    username: 'Lernantino',
    password: 'testpassword'
  }
];

// function to seed User model
const seedUsers = () => User.bulkCreate(userData);

// exports function
module.exports = seedUsers;
