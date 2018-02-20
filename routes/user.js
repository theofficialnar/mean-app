const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

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

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(500).json({
        title: 'Login failed',
        errorMsg: {message: 'Invalid login credentials'}
      });
    };

    //check if password is correct
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(500).json({
        title: 'Login failed',
        errorMsg: {message: 'Invalid login credentials'}
      });
    };

    //create token for the user
    const token = jwt.sign({user}, 'somesecretkey', {expiresIn: 7200});
    res.status(200).json({
      title: 'Login successful',
      token,
      userId: user._id
    })

  } catch (error) {
    res.status(500).json({
      title: 'An error occured',
      errorMsg: error
    });
  };
  
});

module.exports = router;