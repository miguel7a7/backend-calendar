/**
 * Rutas del usuario /Auth
 * host + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  crearUsuario,
  revalidarToken,
  loginUsuario,
} = require("../controllers/auth");

const router = Router();

// Nuevo usuario
router.post(
  "/new",
  [
    // Midlewares
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("apellidos", "El apellido es obligatorio").not().isEmpty(),
    check("cedula", "El num. cedula es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);

// Login usuario
router.post(
  "/",
  [
    [
      // Midlewares
      check("email", "El email es obligatorio").isEmail(),
      check("password", "El password debe ser de 6 caracteres").isLength({
        min: 6,
      }),
      validarCampos,
    ],
  ],
  loginUsuario
);

// Solictar Token
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
