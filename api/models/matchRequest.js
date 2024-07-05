const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchRequestSchema = new Schema({
  menteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const MatchRequest = mongoose.model("MatchRequest", matchRequestSchema);
module.exports = MatchRequest;
