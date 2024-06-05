const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { ObjectId } = require("mongodb");
const moment = require("moment");

router.get("/recentUsersCount", async (req, res) => {
  try {
    // Obtener la fecha de inicio de hoy
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00

    // Obtener la fecha de fin de hoy
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Establecer la hora a las 23:59:59

    // Consultar la base de datos para obtener la cantidad de usuarios creados hoy
    const usersCount = await User.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    res.json({ count: usersCount });
  } catch (error) {
    console.error("Error fetching recent users count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
