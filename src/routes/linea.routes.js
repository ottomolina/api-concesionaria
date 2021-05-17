const { Router } = require('express');
const router = Router()

const ctrl = require('../controllers/linea.controller');
const { validatorsGuardar, validatorsListado, validatorsActualiza } = require('../helpers/linea-validators');

router.post('/guardar', validatorsGuardar, ctrl.insertaLinea);

router.get('/listado', validatorsListado, ctrl.listadoLineas);

router.put('/actualizar/:id', validatorsActualiza, ctrl.actualizaLinea);

module.exports = router
