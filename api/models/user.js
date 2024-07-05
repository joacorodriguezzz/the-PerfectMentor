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
  profileImg: { type: String, required: false },
  language: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  skill: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  mentees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Solo para mentees
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para establecer createdAt antes de guardar
userSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
