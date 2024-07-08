// // controllers/menteeController.js

// const Notification = require("../models/notification"); // Importa el modelo de notificación

// // Obtener todas las notificaciones del mentee
// const getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find({ recipient: req.user.id });
//     res.status(200).json(notifications);
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Aceptar una solicitud de mentoría
// const acceptRequest = async (req, res) => {
//   const { requestId } = req.params;

//   try {
//     const updatedRequest = await Notification.findByIdAndUpdate(
//       requestId,
//       { status: "accepted" },
//       { new: true }
//     );

//     res
//       .status(200)
//       .json({ message: "Request accepted successfully", data: updatedRequest });
//   } catch (error) {
//     console.error("Error accepting request:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Rechazar una solicitud de mentoría
// const rejectRequest = async (req, res) => {
//   const { requestId } = req.params;

//   try {
//     const updatedRequest = await Notification.findByIdAndUpdate(
//       requestId,
//       { status: "rejected" },
//       { new: true }
//     );

//     res
//       .status(200)
//       .json({ message: "Request rejected successfully", data: updatedRequest });
//   } catch (error) {
//     console.error("Error rejecting request:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = {
//   getNotifications,
//   acceptRequest,
//   rejectRequest,
// };
