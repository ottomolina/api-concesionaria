const { Router } = require('express');
const router = Router()

const ctrl = require('../controllers/cotizacion.controller');
const { validatorsGuardar, validatorsListado, validatorsGetCliente } = require('../helpers/cotizacion-validators');


router.post('/guardar', validatorsGuardar, ctrl.insertaCotizacion);

router.get('/listado', validatorsListado, ctrl.listadoCotizacion);

router.get('/get-cliente', validatorsGetCliente, ctrl.getClientesCotizacion);

// router.put('/actualizar/:id', validatorsActualiza, ctrl.actualizaCliente)

module.exports = router

