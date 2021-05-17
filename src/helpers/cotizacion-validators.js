const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');

const Cliente = require('../models/cliente.models');
const Vehiculo = require('../models/vehiculo.models');

const existeClientePorId = async( id = '' ) => {
    const existeCliente = await Cliente.findById( id );
    if(!existeCliente) {
        throw new Error(`El cliente con id: ${id} no está registrado.`);
    }
}

const existeVehiculoPorId = async( id = '' ) => {
    const existeVehiculo = await Vehiculo.findById( id );
    if(!existeVehiculo) {
        throw new Error(`El vehículo con id: ${id} no está registrado.`);
    }
}

const validatorsGuardar = [
    validarJWT,
    check('vehiculo').notEmpty().withMessage('El campo vehiculo es obligatorio.'),
    check('cliente').notEmpty().withMessage('El campo cliente es obligatorio.'),
    check('cliente.id').custom( existeClientePorId ),
    check('vehiculo.id').custom( existeVehiculoPorId ),
    validarCampos
];

const validatorsListado = [
    validarJWT,
    check('clienteid').isMongoId().withMessage('No es un ID válido.')
                      .custom( existeClientePorId ),
    validarCampos
];

const validatorsGetCliente = [
    validarJWT,
    validarCampos
];

module.exports = {
    validatorsGuardar,
    validatorsListado,
    validatorsGetCliente
}
