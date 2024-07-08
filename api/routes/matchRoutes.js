const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  createMatchRequest,
  acceptMatchRequest,
  rejectMatchRequest,
  match,
} = require("../controllers/matchController");
const MatchRequest = require("../models/matchRequest");
const User = require("../models/user");
const { getUserById } = require("../controllers/userController");
const Meeting = require("../models/meetings"); // Importa el modelo de Meeting

// Ruta para crear una solicitud de match
router.post("/", verifyToken, createMatchRequest);

// Ruta para aceptar una solicitud de match
router.put("/accept/:requestId", verifyToken, acceptMatchRequest);

// Ruta para rechazar una solicitud de match
router.put("/reject/:requestId", verifyToken, rejectMatchRequest);

router.get("/:menteeId", async (req, res) => {
  try {
    const menteeId = req.params.menteeId;
    console.log("Fetching match requests for menteeId:", menteeId);

    const matchRequests = await MatchRequest.find({ menteeId }).populate(
      "mentorId"
    );
    console.log("Match requests data:", matchRequests);

    if (!matchRequests) {
      return res.status(404).send("Match requests not found");
    }

    res.send(matchRequests);
  } catch (error) {
    console.error("Error fetching match requests:", error);
    res.status(500).send(error);
  }
});

// Ejemplo de cómo podrías manejar el deshacer el match en tu backend
router.put("/undoMatch/:menteeId", async (req, res) => {
  try {
    const { menteeId } = req.params;
    console.log("Undoing match for menteeId:", menteeId);

    // Buscar al mentee
    const mentee = await User.findById(menteeId);
    if (!mentee) {
      console.log("Mentee not found");
      return res.status(404).json({ message: "Mentee not found" });
    }

    // Eliminar las notas del mentee
    console.log("Deleting notes for mentee:", menteeId);
    mentee.notes = [];
    await mentee.save();

    // Eliminar las reuniones asignadas del mentee
    console.log("Deleting meetings for mentee:", menteeId);
    const deleteMeetingsResult = await Meeting.deleteMany({
      menteeId: menteeId,
    });
    console.log("Meetings delete result:", deleteMeetingsResult);

    // Obtener el mentor del mentee
    const mentorId = mentee.mentorId;
    if (mentorId) {
      const mentor = await User.findById(mentorId);
      if (mentor) {
        console.log("Removing mentee from mentor's list:", menteeId);
        mentor.mentees = mentor.mentees.filter(
          (id) => id.toString() !== menteeId
        );
        await mentor.save();
      }
    }

    // Actualizar el mentee para eliminar el mentorId
    console.log("Clearing mentorId for mentee:", menteeId);
    mentee.mentorId = null;
    await mentee.save();

    console.log("Match undone successfully for mentee:", menteeId);
    res.status(200).json({ message: "Match undone successfully" });
  } catch (error) {
    console.error("Error undoing match:", error);
    res.status(500).json({ message: "Failed to undo match" });
  }
});

module.exports = router;
