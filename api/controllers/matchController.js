const MatchRequest = require("../models/matchRequest");
const User = require("../models/user");

// Controlador para crear una solicitud de match

// controllers/matchRequestController.js

// Obtener todas las solicitudes de match para un mentee específico
const createMatchRequest = async (req, res) => {
  console.log("Creando solicitud de match...");

  try {
    console.log("Mentee ID recibido:", req.body.menteeId); // Este es el ID del mentee enviado desde el frontend
    console.log("Mentor ID obtenido de token:", req.user.id); // ID del mentor autenticado

    const newMatchRequest = new MatchRequest({
      mentorId: req.user.id, // Aquí el mentor es el usuario autenticado
      menteeId: req.body.menteeId, // Y el mentee es el ID pasado desde el frontend
      status: "pending",
    });

    console.log("Solicitud de match creada:", newMatchRequest);

    await newMatchRequest.save();
    console.log("Solicitud de match guardada en la base de datos.");

    res.status(201).json(newMatchRequest);
  } catch (error) {
    console.error("Error creating match request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controlador para aceptar una solicitud de match
const acceptMatchRequest = async (req, res) => {
  console.log("Recibiendo solicitud para aceptar match...");

  const { requestId } = req.params;

  try {
    console.log("Request ID:", requestId);

    const matchRequest = await MatchRequest.findByIdAndDelete(requestId);

    if (!matchRequest) {
      return res.status(404).json({ error: "Match request not found" });
    }

    console.log("Match request aceptada y eliminada:", matchRequest);

    // Obtener el mentee que aceptó la solicitud
    const mentee = await User.findById(req.user.id);

    // Actualizar mentorId del mentee
    await User.findByIdAndUpdate(
      req.user.id,
      { mentorId: matchRequest.mentorId },
      { new: true }
    );

    console.log("Mentee actualizado con mentor:", req.user.id);

    // Obtener el mentor y actualizar su lista de mentees
    const mentor = await User.findById(matchRequest.mentorId);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Añadir el mentee a la lista de mentees del mentor
    mentor.mentees.push(mentee._id);
    await mentor.save();

    console.log("Mentor actualizado con mentee:", mentor);

    res.status(200).json({ mentee, mentor });
  } catch (error) {
    console.error("Error accepting match request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const rejectMatchRequest = async (req, res) => {
  console.log("Recibiendo solicitud para rechazar match...");

  const { requestId } = req.params;

  try {
    console.log("Request ID:", requestId);

    const matchRequest = await MatchRequest.findByIdAndDelete(requestId);

    if (!matchRequest) {
      return res.status(404).json({ error: "Match request not found" });
    }

    console.log("Match request rechazada:", matchRequest);

    res.status(200).json({ message: "Match request rejected successfully" });
  } catch (error) {
    console.error("Error rejecting match request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createMatchRequest,
  acceptMatchRequest,
  rejectMatchRequest,
};
