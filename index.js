const express = require("express");
const dbConnection = require("./database/config");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT;

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
// TODO: auth // crear, login, renew
app.use("/api/auth", require("./routes/auth"));
// TODO: CRUD // Eventos
app.use("/api/eventos", require("./routes/eventos"));

app.listen(port, () => {
  console.log(`El servidor esta corriendo en el Puerto: ${port}`);
});
