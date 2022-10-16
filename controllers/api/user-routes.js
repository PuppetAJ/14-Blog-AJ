// Import router, helper function, and model
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all users route (/api/users/)
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET one user route (/api/users/:id)
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// CREATE a user route (/api/users/)
router.post('/', (req, res) => {
  User.create({
    individualHooks: true,
    username: req.body.username,
    password: req.body.password
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// LOGIN route (/api/users/login)
router.post('/login', (req, res) => {
  // searches for a user with a specific username..
  User.findOne({
     where: {
      username: req.body.username
    }
  }).then(dbUserData => {
    // if no user found send message and return
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that username!' });
      return;
    }

    // uses check password function built into user class to make sure the password is correct
    const validPassword = dbUserData.checkPassword(req.body.password);

    // If valid password is false send error and return
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    // Otherwise, save user session with user id, user name, and loggedIn property set to true
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

// UPDATE a user route (/api/users/:id)
// must pass authorization check 
router.put('/:id', withAuth, (req, res) => {
  // Makes sure to hash new password using hooks before updating a user
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE a user route (/api/users/:id)
// must pass authorization check
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Export routes
module.exports = router;