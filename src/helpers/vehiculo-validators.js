const { check } = require("express-validator");
const { validarJWT, validarCampos } = require("../middlewares");

const Linea = require('../models/linea.models');
const Marca = require('../models/marca.models');
const Tipo = require('../models/tipo.models');
const Vehiculo = require('../models/vehiculo.models');

const existeLinea = async( linea = '' ) => {
    const existeLinea = await Linea.find({ linea });
    if( existeLinea.length === 0 ) {
        throw new Error(`La línea: ${linea} no está registrada.`);
    }
}
const existeMarca = async( marca = '' ) => {
    const existeMarca = await Marca.find({ marca });
    if( existeMarca.length === 0 ) {
        throw new Error(`La marca: ${marca} no está registrada.`);
    }
}
const existeTipo = async( tipo = '' ) => {
    const existeTipo = await Tipo.find({ tipo });
    if( existeTipo.length === 0 ) {
        throw new Error(`El tipo: ${tipo} no está registrado.`);
    }
}
const existeVehiculoPorId = async( id = '' ) => {
    // Verificar si existen los datos del vehículo
    const existeVehiculo = await Vehiculo.findById( id );
    if( !existeVehiculo ) {
        throw new Error(`El vehículo con id: ${id} no está registrado.`);
    }
}

const validatorsGuardar = [
    validarJWT,
    check('linea').notEmpty().withMessage('El campo linea es obligatorio.')
                  .custom( existeLinea ),
    check('marca').notEmpty().withMessage('El campo marca es obligatorio.')
                  .custom( existeMarca ),
    check('tipo').notEmpty().withMessage('El campo tipo es obligatorio.')
                 .custom( existeTipo ),
    check('cc').notEmpty().withMessage('El campo cc (cilindraje) es obligatorio.'),
    check('color').notEmpty().withMessage('El campo color es obligatorio.'),
    check('modelo').notEmpty().withMessage('El campo modelo es obligatorio.'),
    check('precio').notEmpty().withMessage('El campo precio es obligatorio.')
                   .isDecimal({decimal_digits:'2'}).withMessage('El valor enviado en el campo precio no es válido.'),
    validarCampos
];

const validatorsListado = [
    validarJWT,
    validarCampos
];

const validatorsActualiza = [
    validarJWT,
    check('id').isMongoId().withMessage('No es un ID válido.'),
    check('id').custom( existeVehiculoPorId ),
    check('precio').isDecimal().withMessage('El valor enviado en el campo precio no es válido.')
                   .optional(),
    validarCampos
];

module.exports = {
    validatorsGuardar,
    validatorsListado,
    validatorsActualiza
}
