const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: false,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: false,
    min: 6,
    max: 1024,
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
  },
  role: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
