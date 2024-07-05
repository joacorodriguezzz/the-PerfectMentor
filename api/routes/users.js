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

router.get("/registrations-by-day", async (req, res) => {
  try {
    console.log("Fetching registrations by day...");
    const users = await User.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    console.log("Aggregated users by day:", users);

    // Convertir el resultado a un formato de array de 7 días (dom a sáb)
    const registrationsByDay = Array(7).fill(0);
    users.forEach((user) => {
      registrationsByDay[user._id - 1] = user.count; // MongoDB $dayOfWeek devuelve 1 para domingo, 2 para lunes, etc.
    });

    console.log("Registrations by day array:", registrationsByDay);

    res.status(200).json(registrationsByDay);
  } catch (error) {
    console.error("Error fetching registrations by day:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/recent-users", async (req, res) => {
  try {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 horas atrás

    const recentUsers = await User.find({ createdAt: { $gte: yesterday } });
    res.json(recentUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent users", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Fetching user with ID:", userId);

    const user = await User.findById(userId);
    console.log("User data:", user);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send(error);
  }
});

router.get("/:mentorId", async (req, res) => {
  const { mentorId } = req.params;

  try {
    console.log(`Fetching mentor with ID: ${mentorId}`);

    // Verifica si el mentor existe
    const mentor = await User.findById(mentorId);
    if (!mentor) {
      console.log(`Mentor with ID ${mentorId} not found`);
      return res.status(404).json({ error: "Mentor not found" });
    }

    console.log(`Mentor found: ${mentor}`);

    res.json(mentor);
  } catch (error) {
    console.error("Error fetching mentor data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta para obtener la lista de mentees que han aceptado el match con el mentor
router.get("/:mentorId/mentees", async (req, res) => {
  const { mentorId } = req.params;

  try {
    console.log(`Fetching mentor with ID: ${mentorId}`);

    // Verifica si el mentor existe
    const mentor = await User.findById(mentorId);
    if (!mentor) {
      console.log(`Mentor with ID ${mentorId} not found`);
      return res.status(404).json({ error: "Mentor not found" });
    }

    console.log(`Mentor found: ${mentor}`);

    // Obtiene los mentees del mentor basado en el array de IDs
    const mentees = await User.find({ _id: { $in: mentor.mentees } });

    console.log(`Mentees found for mentor ${mentorId}: ${mentees}`);

    res.json(mentees);
  } catch (error) {
    console.error("Error fetching mentees data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
