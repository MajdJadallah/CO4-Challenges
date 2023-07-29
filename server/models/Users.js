const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  healthIssue: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
