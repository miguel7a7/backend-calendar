const { response } = require("express");
const Evento = require("../models/Evento");

// Get Eventos
const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "nombres apellidos"); // find({ condiciones }); populate("user") hace referencia a los datos del usuario por el id que tenemos

  res.status(201).send({
    ok: true,
    eventos,
  });
};

// Adicionar Eventos
const addEvento = async (req, res = response) => {
  // Enviamos los datos del usario segun al modelo y lo obtenemos en evento
  const evento = new Evento(req.body);

  try {
    // Obteniendo el id del usuario
    evento.user = req.uid;

    // Guardando el evento en la BD
    const eventGuardado = await evento.save();

    res.status(200).json({
      ok: true,
      evento: eventGuardado,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: true,
      msg: "Por favor comuniquese con el administrador",
    });
  }
};

// Actualizar Eventos
const updateEvento = async (req, res = response) => {
  const eventoId = req.params.id; // id de la url o del evento
  const uid = req.uid;

  try {
    // Busqueda del evento por ID
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe por el ID",
      });
    }

    // Verificacion del ID por Usuario

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
      });
    }

    // Actualizacion
    const nuevEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevEvento,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Evento Actualizado",
      evento: eventoActualizado,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: true,
      msg: "Por favor comuniquese con el administrador",
    });
  }
};

// Eliminar eventos
const deleteEvento = async (req, res = response) => {
  const eventoId = req.params.id; // id de la url o del evento
  const uid = req.uid;

  try {
    // Busqueda del evento por ID
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe por el ID",
      });
    }

    // Verificacion del ID por Usuario
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio para eliminar este evento",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    res.status(200).json({
      ok: true,
      msg: "Evento Eliminado",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: true,
      msg: "Por favor comuniquese con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  addEvento,
  updateEvento,
  deleteEvento,
};
