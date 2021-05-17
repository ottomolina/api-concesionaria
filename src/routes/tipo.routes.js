const { Router } = require('express');
const router = Router()

const ctrl = require('../controllers/tipo.controller');
const { validatorsGuardar, validatorsListado, validatorsActualiza } = require('../helpers/tipo-validators');

router.post('/guardar', validatorsGuardar, ctrl.insertaTipo);

router.get('/listado', validatorsListado, ctrl.listadoTipos);

router.put('/actualizar/:id', validatorsActualiza, ctrl.actualizaTipo);

module.exports = router
