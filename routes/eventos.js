/**
 * Rutas del usuario /Eventos
 * host + /api/events
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  addEvento,
  updateEvento,
  deleteEvento,
} = require("../controllers/eventos");
const isDate = require("../helpers/isDate");

const router = Router();

// Todas tienen que passr por la autenticacion de JWT o tb podemos colocar dentro de router.get y todas
router.use(validarJWT);

// Obtener Eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha de finalización es obligatorio").custom(isDate),
    validarCampos,
  ],
  addEvento
);

// Actualizar evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha de finalización es obligatorio").custom(isDate),
    validarCampos,
  ],
  updateEvento
);

// Eliminar evento
router.delete("/:id", deleteEvento);

module.exports = router;
