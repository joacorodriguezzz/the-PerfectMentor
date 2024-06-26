// mentorshipController.js

const MentorshipRequest = require("../models/mentorshipRequest");

// Enviar solicitud de mentoría
const sendRequest = async (req, res) => {
  try {
    const { menteeId } = req.body;
    const mentorId = req.user.id; // Asume que el ID del mentor está en el token

    // Crear una nueva solicitud de mentoría
    const newRequest = new MentorshipRequest({ mentorId, menteeId });
    await newRequest.save();

    res
      .status(201)
      .json({ message: "Solicitud de mentoría enviada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error enviando la solicitud de mentoría." });
  }
};

// Actualizar estado de solicitud de mentoría (aceptar o rechazar)
const updateRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    // Encontrar la solicitud y actualizar su estado
    const request = await MentorshipRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Solicitud no encontrada." });
    }

    request.status = status;
    await request.save();

    res
      .status(200)
      .json({ message: "Estado de la solicitud actualizado correctamente." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error actualizando el estado de la solicitud." });
  }
};

// Obtener todas las solicitudes de mentoría para el mentee actual
const getMentorshipRequestsForMentee = async (req, res) => {
  try {
    const menteeId = req.user.id; // Asume que el ID del mentee está en el token

    // Encontrar todas las solicitudes de mentoría para el mentee
    const requests = await MentorshipRequest.find({ menteeId });

    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error obteniendo las solicitudes de mentoría." });
  }
};

module.exports = {
  sendRequest,
  updateRequestStatus,
  getMentorshipRequestsForMentee,
};
