const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongoDB');
const jwt = require('jsonwebtoken');

const Message = require('../models/message');
const User = require('../models/user');

//get all messages
router.get('/', async (req, res) => {
  try {
    const msgs = await Message.find();
    res.status(200).json({
      title: 'Messages succesfully retrieved',
      obj: msgs
    });
  } catch (error) {
    res.status(500).json({
      title : 'An error occurred',
      errorMsg: error
    });
  };
});

//middleware to check if user has a valid token
router.use('/', async (req, res, next) => {
  try {
    const decoded = await jwt.verify(req.query.token, 'somesecretkey');
    if (decoded) next();
  } catch (error) {
    res.status(401).json({
      title: 'Not Authenticated',
      errorMsg: error
    });
  };
});

//post new message
router.post('/', async (req, res) => {
  const decoded = jwt.decode(req.query.token);
  try {
    const user = await User.findById(decoded.user._id);
    let message = new Message({
      content : req.body.content,
      user: user._id
    });
    
    try {
      const result = await message.save();

      //push message created to the user's messages array
      user.messages.push(result);
      user.save();

      res.status(201).json({
        title: 'Message saved',
        obj: result
      });
    } catch (error) {
      res.status(500).json({
        title: 'An error occured',
        errorMsg: error
      });
    };

  } catch (error) {
    res.status(500).json({
      title: 'An error occured',
      errorMsg: error
    });
  };
});

//update message
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).json({
      title: 'An error occured',
      errorMsg: {message: 'ID not found'}
    })
  };

  try {
    const message = await Message.findOneAndUpdate({
      _id : id
    }, {
      $set : {content : req.body.content}
    }, {
      new : true
    });

    if (!message) {
      return res.status(404).json({
        title: 'No message retrieved',
        errorMsg: {message: 'Message not found'}
      })
    };

    res.status(200).json({
      title: 'Message updated',
      obj: message
    });
  } catch (error) {
    res.status(500).json({
      title: 'An error occured',
      errorMsg: error
    });
  }

  // try {
  //   const message = await Message.findById(id);
  //   if (!message) {
  //     return res.status(404).json({
  //       title: 'No message retrieved',
  //       errorMsg: {message: 'Message not found'}
  //     })
  //   };
  //   message.content = req.body.content;
  //   try {
  //     const result = await message.save();
  //     res.status(200).json({
  //       title: 'Message updated',
  //       obj: result
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       title: 'An error occured',
  //       errorMsg: error
  //     });
  //   };
  // } catch (error) {
  //   res.status(500).json({
  //     title: 'An error occured',
  //     errorMsg: error
  //   });
  // };
});

// delete message
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).json({
      title: 'An error occured',
      errorMsg: {message: 'ID not found'}
    })
  };

  try {
    const message = await Message.findOneAndRemove({
      _id : id
    });

    if (!message) {
      return res.status(404).json({
        title: 'No message deleted',
        errorMsg: {message: 'Message not found'}
      })
    };

    res.status(200).json({
      title: 'Message deleted',
      obj: message
    });
  } catch (error) {
    res.status(500).json({
      title: 'An error occured',
      errorMsg: error
    });
  };
});

module.exports = router;