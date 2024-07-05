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

// const createMatchRequest = async (req, res) => {
//   console.log("Creando solicitud de match...");

//   // Lógica para crear la solicitud de match
//   try {
//     console.log("Mentor ID recibido:", req.body.menteeId);
//     console.log("Mentee ID obtenido de token:", req.user.id); // asumiendo que req.user contiene la información del usuario autenticado

//     // Ejemplo de lógica para crear una solicitud de match
//     const newMatchRequest = new MatchRequest({
//       menteeId: req.body.menteeId,
//       mentorId: req.user.id,
//       status: 'pending',
//     });

//     console.log("Solicitud de match creada:", newMatchRequest);

//     await newMatchRequest.save();
//     console.log("Solicitud de match guardada en la base de datos.");

//     res.status(201).json(newMatchRequest);
//   } catch (error) {
//     console.error("Error creating match request:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = createMatchRequest;

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

    // Update mentee's mentorId with mentor's _id
    await User.findByIdAndUpdate(
      req.user.id, // assuming req.user.id holds mentee's _id
      { mentorId: matchRequest.mentorId },
      { new: true }
    );

    console.log("Mentee actualizado con mentor:", req.user.id);

    res.status(200).json(matchRequest);
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
