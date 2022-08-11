const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

// CREACION DE USUARIO
// = response => nos ayuda para tener el intellisence de js
const crearUsuario = async (req, res = response) => {
  const { cedula, email, password } = req.body;
  try {
    // Verificamos si existe en la BD el email enviado
    let usuario = await Usuario.findOne({ email });

    // Verificamos si existe en la BD el Cedula enviado
    const usuarioCedula = await Usuario.findOne({ cedula });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado",
      });
    }

    if (usuarioCedula) {
      return res.status(400).json({
        ok: false,
        msg: "El numero de Cedula  ya esta registrado",
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardando los datos enviados
    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.nombres);

    res.status(201).send({
      ok: true,
      uid: usuario.id,
      name: usuario.nombres,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

// LOGIN DE USUARIO
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificamos si existe en la BD el email enviado
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    // Confirmar los password
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password Incorrecto",
      });
    }

    // Generar nuestro JWT
    const token = await generarJWT(usuario.id, usuario.nombres);

    // respuesta correcta enviada
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.nombres,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const uid = req.uid;
  const nombres = req.nombres;

  // Generar un nuevo token  y retornarlo en esta perticion
  // Generar nuestro JWT
  const token = await generarJWT(uid, nombres);

  res.send({
    ok: true,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
