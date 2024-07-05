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

router.put("/undoMatch/:menteeId", async (req, res) => {
  const { menteeId } = req.params;

  try {
    // Verificar si el mentee existe
    const mentee = await User.findById(menteeId);
    if (!mentee) {
      return res.status(404).json({ message: "Mentee no encontrado" });
    }

    // Deshacer el match asignando null al campo mentorId
    mentee.mentorId = null;
    await mentee.save();

    // Responder con éxito
    res.status(200).json({ message: "Match deshecho correctamente" });
  } catch (error) {
    console.error("Error al deshacer el match:", error);
    res.status(500).json({ message: "Error interno al deshacer el match" });
  }
});

module.exports = router;
