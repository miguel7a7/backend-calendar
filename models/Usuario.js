const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefono: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("Usuario", usuarioSchema);
