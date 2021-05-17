const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { validarCampos } = require('../middlewares/validar-campos');
const Ctrl = require('../controllers/auth.controller');

router.post('/login', [
    check('correo', 'El correo no es válido.').isEmail(),
    check('password', 'La contraseña debe tener al menos 8 caracteres.').isLength({ min: 8 }),
    validarCampos
], Ctrl.login);

module.exports = router;