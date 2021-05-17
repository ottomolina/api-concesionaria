const { Router } = require('express');
const router = Router()

const ctrl = require('../controllers/marca.controller');
const { validatorsGuardar, validatorsListado, validatorsActualiza } = require('../helpers/marca-validators');

router.post('/guardar', validatorsGuardar, ctrl.insertaMarca)

router.get('/listado', validatorsListado, ctrl.listadoMarcas)

router.put('/actualizar/:id', validatorsActualiza, ctrl.actualizarMarca)


module.exports = router
