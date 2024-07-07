const mongoose = require("mongoose");

const objectiveSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "in-progress",
  },
});

module.exports = mongoose.model("Objective", objectiveSchema);
