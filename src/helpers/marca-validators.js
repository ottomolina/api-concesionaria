const { check } = require("express-validator");
const { validarJWT, validarCampos } = require("../middlewares");

const Marca = require('../models/marca.models');

const existeMarcaPorId = async( id = '' ) => {
    // Verificar si existe la marca
    const existeMarca = await Marca.findById( id );
    if(!existeMarca) {
        throw new Error(`La marca de vehículo con id: ${id} no está registrada.`);
    }
}

const existeMarca = async( marca = '' ) => {
    // Verificar si la marca ya está registrada
    const existeMarca = await Marca.findOne({ marca });
    if(existeMarca) {
        throw new Error(`La marca: ${marca} ya se encuentra registrada.`);
    }
}

const validatorsGuardar = [
    validarJWT,
    check('marca').notEmpty().withMessage('El campo marca es obligatorio.')
                  .isLength({ max: 64 }).withMessage('La longitud del campo marca es demasiada larga.')
                  .custom( existeMarca ),
    validarCampos
];

const validatorsListado = [
    validarJWT,
    validarCampos
];

const validatorsActualiza = [
    validarJWT,
    check('id').isMongoId().withMessage('No es un ID válido.'),
    check('id').custom( existeMarcaPorId ),
    validarCampos
];


module.exports = {
    validatorsGuardar,
    validatorsListado,
    validatorsActualiza
}
