// Import router
const router = require('express').Router();

// Import route files
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Declare prefixes to be used before routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

// If a non existent page is loaded send this
router.use((req, res) => {
  res.status(404).end();
});

// Export routes
module.exports = router;