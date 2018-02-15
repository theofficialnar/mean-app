const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongoDB');
const bcrypt = require('bcryptjs');

const User = require('../models/user')

router.post('/', async (req, res) => {
  let user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  try {
    const result = await user.save();
    res.status(201).json({
      title: 'User created',
      obj: result
    });
  } catch (error) {
    res.status(500).json({
      title: 'An error occured',
      errorMsg: error
    });
  };
});

module.exports = router;