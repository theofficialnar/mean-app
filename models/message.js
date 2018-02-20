var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = require('../models/user');

var schema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    // define relationship
    ref: 'User'
  }
});

//run after a 'remove'
schema.post('remove', function (message) {
  User.findById(message.user, function (error, user) {
    user.messages.pull(message._id);
    user.save();
  });
});

module.exports = mongoose.model('Message', schema);