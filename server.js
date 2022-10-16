// Import module, routes, and connection
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require ('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Declare session, with unique secret
const sess = {
  secret: '065b15a8-e7bc-4676-8e76-33f18f2df80d',
  cookie: {},
  resave: false,
  saveUnitialized: true,
  // store session using connect-session-sequelize package with our database
  store: new SequelizeStore({
      db: sequelize
  }),
  expires: new Date(Date.now() + 3600000)
};

// declare express instance and port
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use(routes);

// sync with database and then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on url: http://localhost:${PORT}`));
});