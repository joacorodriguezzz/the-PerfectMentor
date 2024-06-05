const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/user");
const multer = require("multer");

// Ruta protegida para obtener los datos del perfil del usuario
//req.cookies consigo cookie con verify con user.id
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Usar el ID del usuario desde el token verificado

    // Buscar al usuario en la base de datos por su ID
    const user = await User.findById(userId).select("-password"); // Excluir la contraseña

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Responder con los datos del usuario
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Datos recibidos del cliente:", req.body); // <-- Agregar log para verificar datos recibidos
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    console.log("Usuario actualizado:", updatedUser); // <-- Agregar log para verificar usuario actualizado

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", verifyToken, (req, res) => {
  const user = {
    id: req.user.id,
    role: req.user.role,
    userName: req.user.userName,
    email: req.user.email,
  };
  res.json(user);
});
// router.put("/", upload.single("profileImg"), async (req, res) => {
//   try {
//     const userId = req.user.id; // Asegúrate de que la autenticación está configurada y user está en req
//     const updates = {
//       userName: req.body.userName,
//       email: req.body.email,
//       role: req.body.role,
//       age: req.body.age,
//       country: req.body.country,
//       language: req.body.language,
//     };

//     if (req.file) {
//       updates.profileImg = req.file.path;
//     }

//     const user = await User.findByIdAndUpdate(userId, updates, { new: true });
//     res.json(user);
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).send("Error updating profile");
//   }
// });

module.exports = router;
