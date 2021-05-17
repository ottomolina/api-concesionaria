const { Router } = require('express');
const { check, query } = require('express-validator');
const router = Router();

const ctrl = require('../controllers/concesionario.controller');
const { validarJWT, validarCampos } = require('../middlewares/');
const { existeConcesionarioPorId } = require('../helpers/concesionario-validators');

router.post('/guardar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').notEmpty(),
    check('direccion', 'La dirección es obligatoria.').notEmpty(),
    validarCampos
], ctrl.insertaConcesionario);

router.get('/listado', [
    validarJWT,
    validarCampos
], ctrl.listaConcesionario);

router.get('/getconcesionario', [
    validarJWT,
    query('id', 'No es un ID válido.').isMongoId().optional(),
    validarCampos
], ctrl.getConcesionarioById)

router.put('/actualizar/:id', [
    validarJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom( existeConcesionarioPorId ),
    validarCampos
], ctrl.actualizaConcesionario);

module.exports = router
