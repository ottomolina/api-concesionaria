const { Router } = require('express');
const router = Router()

const { validarJWT, validarCampos } = require('../middlewares');
const ctrl = require('../controllers/datos.controller');


router.get('/listado', [
    validarJWT,
    validarCampos
], ctrl.listadoDatos);

module.exports = router;
