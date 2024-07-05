// models/Meeting.js
const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  menteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
});

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
