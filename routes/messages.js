const express = require('express');
const router = express.Router();

const Message = require('../models/message');

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

//post new message
router.post('/', async (req, res) => {
  let message = new Message({
    content : req.body.content
  });
  
  try {
    const result = await message.save();
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
});

//update message
router.patch('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        title: 'No message retrieved',
        errorMsg: {message: 'Message not found'}
      })
    };
    message.content = req.body.content;
    try {
      const result = await message.save();
      res.status(200).json({
        title: 'Message updated',
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

module.exports = router;