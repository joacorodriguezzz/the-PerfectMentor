const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");

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

router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Usar el ID del usuario desde el token verificado
    const user = await User.findById(userId).select("-password"); // Excluir la contraseña
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para actualizar el perfil del usuario
// router.put("/", verifyToken, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const updates = req.body;
//     const updatedUser = await User.findByIdAndUpdate(userId, updates, {
//       new: true,
//     }).select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({ error: "Usuario no encontrado" });
//     }

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });

router.post("/", verifyToken, (req, res) => {
  const user = {
    id: req.user.id,
    role: req.user.role,
    userName: req.user.userName,
    email: req.user.email,
  };
  res.json(user);
});

router.get("/mentees", verifyToken, async (req, res) => {
  try {
    const mentorId = req.user.id; // Obtener el ID del mentor autenticado desde el token
    const mentor = await User.findById(mentorId).populate("mentees");
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ error: "Mentor no encontrado" });
    }
    res.json(mentor.mentees);
  } catch (error) {
    console.error("Error fetching mentees:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.put(
  "/update/:userId",
  upload.single("profileImage"),
  async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    console.log("User ID:", userId);
    console.log("Update Data:", req.body);

    if (req.file) {
      // Si hay un archivo cargado, agrega la ruta al objeto de datos del usuario actualizado
      updatedUserData.profileImage = req.file.path;
    }

    try {
      // Busca y actualiza el usuario por ID
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedUserData,
        {
          new: true,
        }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.status(200).json(updatedUser); // Devuelve el usuario actualizado
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
);

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
