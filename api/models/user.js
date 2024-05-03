const { string, required } = require("joi");
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
  age: {
    type: Number,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  profileImg: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
