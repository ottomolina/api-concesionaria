const validarJWT = require('../middlewares/valida-jwt');
const validarRol = require('../middlewares/valida-rol');
const validarCampos = require('../middlewares/validar-campos');

module.exports = {
    ...validarJWT,
    ...validarRol,
    ...validarCampos
}
