const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profile");
const matchRoutes = require("./routes/matchRoutes");
const meetingRoutes = require("./routes/meetings");
const toDo = require("./routes/toDoRoutes");

const userData = require("./routes/userData");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middleware para capturar el body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

var corsOptions = {
  origin: "http://localhost:3000",
  method: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
};

// Configuración de middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/userData", userData);
app.use("/api/matchRequest", matchRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/toDo", toDo);

// Conexión a la base de datos
const uri = `mongodb+srv://joacorodriguez:joacorodriguez@cluster0.sjzxkmd.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});
