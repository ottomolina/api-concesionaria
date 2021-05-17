const { Router } = require('express');
const router = Router()

const ctrl = require('../controllers/vehiculo.controller');
const { validatorsGuardar, validatorsListado, validatorsActualiza } = require('../helpers/vehiculo-validators');

router.post('/guardar', validatorsGuardar, ctrl.insertarVehiculo);

router.get('/listado', validatorsListado, ctrl.listadoVehiculos);

router.put('/actualizar/:id', validatorsActualiza, ctrl.actualizarVehiculo);

module.exports = router
