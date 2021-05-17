const { check } = require("express-validator");
const { validarJWT, validarCampos } = require("../middlewares");

const Tipo = require('../models/tipo.models');

const existeTipoPorId = async( id = '' ) => {
    // Verificar si existe el tipo
    const existeTipo = await Tipo.findById( id );
    if(!existeTipo) {
        throw new Error(`El tipo de vehículo con id: ${id} no está registrado.`);
    }
}

const existeTipo = async( tipo = '' ) => {
    // Verificar si el tipo ya está registrado
    const existeTipo = await Tipo.findOne({ tipo });
    if(existeTipo) {
        throw new Error(`El tipo: ${tipo} ya se encuentra registrado.`);
    }
}

const validatorsGuardar = [
    validarJWT,
    check('tipo').notEmpty().withMessage('El campo tipo es obligatorio.')
                  .isLength({ max: 64 }).withMessage('La longitud del campo tipo es demasiada larga.')
                  .custom( existeTipo ),
    validarCampos
];

const validatorsListado = [
    validarJWT,
    validarCampos
];

const validatorsActualiza = [
    validarJWT,
    check('id').isMongoId().withMessage('No es un ID válido.'),
    check('id').custom( existeTipoPorId ),
    validarCampos
];


module.exports = {
    validatorsGuardar,
    validatorsListado,
    validatorsActualiza
}
