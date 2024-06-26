const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userId = User && User.userId;

// Ruta para obtener la información de un usuario específico
router.get("/", async (req, res) => {
  try {
    // Obtener el usuario a partir de la sesión actual
    const userId = req.session.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta para actualizar la información del usuario logueado
router.put("/", async (req, res) => {
  try {
    // Obtener el usuario a partir de la sesión actual
    const userId = req.session.userId;
    const updatedUserData = req.body; // Datos actualizados del usuario desde el front-end
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
