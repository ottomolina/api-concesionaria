const { response, request } = require("express");
const { check } = require("express-validator");
const { validarJWT, validarCampos } = require("../middlewares");

const Linea = require('../models/linea.models');
const Util = require('../util/util');

const existeLineaPorId = async( id = '' ) => {
    // Verificar si existe la linea del vehículo
    const existeLinea = await Linea.findById( id );
    if(!existeLinea) {
        throw new Error(`La línea de vehículos con id: ${id} no está registrada.`);
    }
}

const existeLinea = async( req = request, res = response, next ) => {
    // Verificar si la línea ya está registrada
    const { marcaid, linea } = req.body;
    const existeTipo = await Linea.findOne({ marcaid, linea });
    if(existeTipo) {
        return Util.enviarMensaje(res, `La línea de vehículos: ${linea} ya está registrada para la marca seleccionada.`, false, 400)
    }
    next();
}

const validatorsGuardar = [
    validarJWT,
    check('linea').notEmpty().withMessage('El campo linea es obligatoria.')
                  .isLength({ max: 64 }).withMessage('La longitud del campo tipo es demasiada larga.'),
    // existeLinea,
    validarCampos
];

const validatorsListado = [
    validarJWT,
    validarCampos
];

const validatorsActualiza = [
    validarJWT,
    check('id').isMongoId().withMessage('No es un ID válido.'),
    check('id').custom( existeLineaPorId ),
    validarCampos
];


module.exports = {
    validatorsGuardar,
    validatorsListado,
    validatorsActualiza
}
