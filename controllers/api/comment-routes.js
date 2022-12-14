// Import router, helper function, and model
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments route (/api/comments)
router.get('/', (req, res) => {
  Comment.findAll({
    attributes: ['id', 'comment_text','user_id','post_id'],
    order: [['created_at', 'DESC']]
  })
  .then(commentData => res.json(commentData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// CREATE a comment route (/api/comments)
// Only create comment if withAuth check passes
router.post('/', withAuth, (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// DELETE a comment route (/api/comments/:id)
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(commentData => {
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(commentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Export router
module.exports = router;