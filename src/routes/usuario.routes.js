const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { validarJWT } = require('../middlewares/valida-jwt');
const { esAdminRol } = require('../middlewares/valida-rol');
const { validarCampos } = require('../middlewares/validar-campos');

const { existeCorreo, existeUsuarioPorId } = require('../helpers/usuario-validators');
const ctrl = require('../controllers/usuario.controller');

router.post('/guardar',[
    // validarJWT,
    check('nombres', 'El nombre es obligatorio.').notEmpty(),
    check('apellidos', 'El apellido es obligatorio.').notEmpty(),
    check('correo', 'El correo no es válido.').isEmail(),
    check('password', 'La contraseña debe tener al menos 8 caracteres.').isLength({ min: 8 }),
    check('correo').custom( existeCorreo ),
    validarCampos
    ], ctrl.insertaUsuario);

router.get('/listado', [ 
    // validarJWT,
    // esAdminRol,
    validarCampos
], ctrl.listaUsuario);

router.get('/getusuario', [ 
    validarJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    // esAdminRol,
    validarCampos
], ctrl.getUsuarioById);

router.put('/actualizar/:id',[
    // validarJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], ctrl.actualizaUsuario);

router.delete('/eliminar/:id', [
    // validarJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], ctrl.eliminaUsuario)

module.exports = router;
