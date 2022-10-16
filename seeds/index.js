// Import seeding functions
const seedComments = require('./comment-seeds');
const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');

// Import sequelize connection
const sequelize = require('../config/connection');

// asynchronous seedAll function
const seedAll = async () => {
  // Overwrites existing tables when syncing to database
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  // executes seedUsers function
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
  // executes seedPosts function
  await seedPosts();
  console.log('\n----- POSTS SEEDED -----\n');
  // executes seedComments function
  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');
  // exits the process
  process.exit(0);
};

// runs the function when the script is called
seedAll();
