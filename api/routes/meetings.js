// routes/meetingRoutes.js

const express = require("express");
const router = express.Router();
const Meeting = require("../models/meetings");

// Crear una reunión
router.post("/create", async (req, res) => {
  console.log("Creating meeting...");
  const { mentorId, menteeId, date, time, description } = req.body;

  try {
    const newMeeting = new Meeting({
      mentorId,
      menteeId,
      date,
      time,
      description,
    });
    await newMeeting.save();
    console.log("Meeting created:", newMeeting);
    res.status(201).json(newMeeting);
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/mentor/:mentorId", async (req, res) => {
  console.log("Fetching meetings for mentor...");
  const { mentorId } = req.params;

  try {
    const meetings = await Meeting.find({ mentorId });
    console.log("Meetings fetched:", meetings);
    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(400).json({ error: error.message });
  }
});

// Actualizar una reunión
router.put("/update/:meetingId", async (req, res) => {
  try {
    const { meetingId } = req.params;
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      req.body,
      { new: true }
    );
    console.log("Meeting updated:", updatedMeeting);
    res.status(200).json(updatedMeeting);
  } catch (error) {
    console.error("Error updating meeting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Eliminar una reunión
router.delete("/:meetingId", async (req, res) => {
  console.log("Deleting meeting...");
  const { meetingId } = req.params;

  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);
    if (!deletedMeeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    console.log("Meeting deleted:", deletedMeeting);
    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/mentee/:menteeId", async (req, res) => {
  console.log("Fetching meetings for mentee...");
  const { menteeId } = req.params;

  try {
    const meetings = await Meeting.find({ menteeId });
    console.log("Meetings fetched:", meetings);
    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
