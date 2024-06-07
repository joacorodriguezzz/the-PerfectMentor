const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { ObjectId } = require("mongodb");
const moment = require("moment");
const verifyToken = require("../middlewares/verifyToken");

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta para obtener el número total de usuarios
router.get("/api/users", async (req, res) => {
  try {
    // Utiliza el método `countDocuments` de Mongoose para obtener el número total de documentos en la colección
    const totalUsers = await User.countDocuments();

    // Devuelve el número total de usuarios como respuesta
    res.json({ totalUsers });
  } catch (error) {
    console.error("Error fetching total users:", error);
    // Devuelve un mensaje de error en caso de que ocurra un error
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { menteeId } = req.body;
    const mentorId = req.user.id; // ID del mentor desde el token

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    // Agregar el mentee a la lista de mentees del mentor
    mentor.mentees.push(menteeId);
    await mentor.save();

    res.status(200).json({ message: "Mentee agregado exitosamente" });
  } catch (error) {
    console.error("Error al agregar mentee:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// router.get("/me", async (req, res) => {});
//req.cookies consigo cookie con verify con user.id

// Ruta protegida para obtener los datos del perfil del usuario

// Ruta para obtener el número total de mentees

// router.get("/api/recentUsers", async (req, res) => {
//   try {
//     // Obtener la fecha de hace 24 horas
//     const yesterday = moment().subtract(1, "days");
//     console.log("Yesterday:", yesterday); // Imprimir la fecha de hace 24 horas

//     // Consultar la base de datos para obtener los usuarios creados en las últimas 24 horas
//     const recentUsers = await User.find({
//       createdAt: { $gte: yesterday },
//     });

//     res.json(recentUsers);
//   } catch (error) {
//     console.error("Error fetching recent users:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// Exporta el enrutador para usarlo en tu aplicación Express

module.exports = router;
