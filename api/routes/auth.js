const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/signUp", async (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const isEmailExist = await User.findOne({ email: req.body.email });
  const re = /\S+@\S+\.\S+/; //que no sea en blanco, busca @, que no sea en blanco, busca . y que no sea en blanco

  if (!re.test(email)) {
    return res.status(400).json({ error: "Email no válido" });
  }

  if (isEmailExist) {
    return res.status(400).json({ error: "Email ya registrado" });
  }

  // hash contraseña
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
    res.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/signIn", async (req, res) => {
  // console.log(User);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "contraseña no válida" });

  // crear token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "secreto"
  );

  console.log(token);
  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
});

module.exports = router;
