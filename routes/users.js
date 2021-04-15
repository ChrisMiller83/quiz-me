var express = require('express');
var router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Post http://localhost:3000/api/v1/users/register in insomnia
router.post('/register', async (req, res) => {
  // check for email, username and password on request
  if (!req.body.email || !req.body.username || !req.body.password) {
    return res.status(400).json({
      error: 'Please include email, username and password'
    })
  }

  // check database for existing user
  const user = await models.User.findOne({
    where: {
      email: req.body.email
    }
  })
  // if exists, send error
  if (user) {
    return res.status(400).json({
      error: 'Email already in use'
    })
  }
  // hash password
  const hash = await bcrypt.hash(req.body.password, 10)
  // create user
  const newUser = await models.User.create({
    email: req.body.email,
    username: req.body.username,
    password: hash,
  });
  // respond with success message
  return res.status(201).json({ newUser });

});

router.post('/login', async (req, res) => {
  // check database for existing user
  // if not there, send error

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      error: 'Please include email and password'
    });
  }

  // find user from email
  const user = await models.User.findOne({
    where: {
      email: req.body.email
    },
  });

  // if no user, send error
  if (!user) {
    return res.status(404).json({
      error: 'No user with that email found',
    });
  }

  // check password
  const match = await bcrypt.compare(req.body.password, user.password)
  // if no match, send error
  if (!match) {
    return res.status(401).json({
      error: 'Password incorrect'
    })
  }
  // store user in  session
  req.session.user = user;

  // respond with user info
  res.json({
    id: user.id,
    username: user.username,
    updatedAt: user.updatedAt,
  });
});

// Log out
router.get('/logout', (req, res) => {
  // clear user data from session
  req.session.user = null;
  // send success response
  res.json({
    success: 'Logged out successfully',
  });
});

router.get('/current', (req, res) => {
  const { user } = req.session;
  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(401).json({
      error: 'Not logged in',
    });
  }
});

module.exports = router;
