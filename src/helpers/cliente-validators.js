const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const Cliente = require('../models/cliente.models');

const validatorsGuardar = [
    validarJWT,
    check('nombres', 'El campo nombres es obligatorio.').notEmpty(),
    check('apellidos', 'El campo apellidos es obligatorio.').notEmpty(),
    check('telefono').notEmpty().withMessage('El teléfono es obligatorio.')
                     .isLength({ min: 8 }).withMessage('El teléfono no posee la longitud requerida.'),
    check('correo').notEmpty().withMessage('El correo es requerido.')
                    .isEmail().withMessage('El correo no es válido.'),
    check('direccion', 'El campo dirección es obligatorio.').notEmpty(),
    check('nacimiento').notEmpty().withMessage('La fecha de nacimiento es obligatoria.')
                        .isDate().withMessage('La fecha de nacimiento enviada no es válida.'),
    check('genero', 'El campo género es obligatorio.').notEmpty(),
    check('ocupacion', 'El campo ocupación es obligatorio.').notEmpty(),
    check('ingresos', 'El campo dirección es obligatorio.').notEmpty(),
    validarCampos
];

const validatorsListado = [
    validarJWT,
    validarCampos
]

const existeClientePorId = async( id = '' ) => {
    // Verificar si existe el cliente
    const existeCliente = await Cliente.findById( id );
    if(!existeCliente) {
        throw new Error(`El cliente con id: ${id} no está registrado.`);
    }
}

const validatorsActualiza = [
    validarJWT,
    check('id').isMongoId().withMessage('No es un ID válido.'),
    check('id').custom( existeClientePorId ),
    validarCampos
];

module.exports = {
    validatorsGuardar,
    validatorsListado,
    validatorsActualiza
}
