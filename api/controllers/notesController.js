// controllers/userController.js

const User = require("../models/User");

// Controlador para guardar notas
exports.saveNotes = async (req, res) => {
  try {
    const { menteeId } = req.params;
    const { notes } = req.body;

    // Actualizar el campo 'notes' del usuario (mentee) específico
    await User.findByIdAndUpdate(menteeId, { notes });

    res.json({ message: "Notes saved successfully" });
  } catch (error) {
    console.error("Error saving notes:", error);
    res.status(500).json({ error: "Error saving notes" });
  }
};
