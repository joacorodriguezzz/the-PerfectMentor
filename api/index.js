const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const authRoutes = require("./routes/auth");
const favouritesRoutes = require("./routes/favourites");
const verifyToken = require("./middlewares/verify-token.js");
const cors = require("cors");
require("dotenv").config();

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

// route middlewares
app.use(cors(corsOptions));
app.use("/api/user", authRoutes);
app.use("/api/favourites", verifyToken, favouritesRoutes);

// Conexión a Base de datos
const uri = `
             mongodb+srv://joacorodriguezz:joar2203@theperfectmentor.kryct1b.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));

// iniciar server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});
