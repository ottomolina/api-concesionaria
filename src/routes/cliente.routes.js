const { Router } = require('express');
const router = Router();

const ctrl = require('../controllers/cliente.controller');
const { validatorsGuardar, validatorsListado, validatorsActualiza } = require('../helpers/cliente-validators');


router.post('/guardar', validatorsGuardar, ctrl.insertarCliente)

router.get('/listado', validatorsListado, ctrl.listadoClientes)

router.put('/actualizar/:id', validatorsActualiza, ctrl.actualizaCliente)

module.exports = router
