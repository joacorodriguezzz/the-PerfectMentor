// mentorshipRoutes.js

const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const mentorshipController = require("../controllers/mentorshipController");

// Enviar solicitud de mentoría
router.post("/send-request", verifyToken, mentorshipController.sendRequest);

// Actualizar estado de solicitud de mentoría (aceptar o rechazar)
router.post(
  "/update-status",
  verifyToken,
  mentorshipController.updateRequestStatus
);

// Obtener todas las solicitudes de mentoría para el mentee actual
router.get(
  "/requests",
  verifyToken,
  mentorshipController.getMentorshipRequestsForMentee
);

module.exports = router;
