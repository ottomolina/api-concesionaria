const { validationResult } = require("express-validator");

const Util = require('../util/util');


const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return Util.enviarMensaje(res, errors, 400);
    }
    next();
}

module.exports = {
    validarCampos
}