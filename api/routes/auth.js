const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/signUp", async (req, res) => {
  const email = req.body.email;
  const isEmailExist = await User.findOne({ email: req.body.email });
  const re = /\S+@\S+\.\S+/;

  if (!re.test(email)) {
    return res.status(400).json({ error: "Email no válido" });
  }

  if (isEmailExist) {
    return res.status(400).json({ error: "Email ya registrado" });
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: password,
    role: req.body.role,
  });

  try {
    const savedUser = await user.save();
    const token = jwt.sign(
      {
        name: savedUser.name,
        id: savedUser._id,
      },
      "secreto",
      { expiresIn: "3h" }
    );

    res.cookie("authToken", token, { httpOnly: true }).json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Contraseña no válida" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        userName: user.userName,
        email: user.email,
      },
      "secreto",
      {
        expiresIn: "1h",
      }
    );

    res.cookie("authToken", token);
    res.status(200).json({ error: null, data: { token } });
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
