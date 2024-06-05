// const jwt = require("jsonwebtoken");

// // middleware to validate token (rutas protegidas)
// const verifyToken = (req, res, next) => {
//   const token = req.header("auth-token");
//   console.log(req.header("auth-token"));
//   if (!token) return res.status(401).json({ error: "Acceso denegado" });
//   try {
//     const verified = jwt.verify(token, "secreto");
//     req.user = verified;
//     next(); // continuamos
//   } catch (error) {
//     res.status(400).json({ error: "token no es válido" });
//   }
// };
// module.exports = verifyToken;

const jwt = require("jsonwebtoken");

// Middleware para validar el token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken; // Leer el token desde las cookies
  console.log("Token recibido: Linea 23 VeriTok"); // Log para depurar
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const verified = jwt.verify(token, "secreto");
    console.log("Token verificado:", verified); // Log para depurar
    req.user = verified;
    next(); // Continuar
  } catch (error) {
    console.error("Error al verificar el token:", error); // Log para depurar
    res.status(400).json({ error: "Token no es válido" });
  }
};

module.exports = verifyToken;
