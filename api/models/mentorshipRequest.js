// mentorshipModel.js

const mongoose = require("mongoose");

const mentorshipSchema = new mongoose.Schema(
  {
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ID del mentor
    mentee: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ID del mentee
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    }, // Estado de la solicitud
  },
  { timestamps: true }
);

const Mentorship = mongoose.model("Mentorship", mentorshipSchema);

module.exports = Mentorship;
