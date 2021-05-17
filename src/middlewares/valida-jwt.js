const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Util = require('../util/util');
const Usuario = require('../models/usuario.models');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    if ( !token ) {
        return Util.enviarMensaje(res, 'Petición denegada, primero debe autenticarse.', false, 401)
    }
    try {
        const { uid } = jwt.verify( token, process.env.SECRETKEY);
        const usuario = await Usuario.findById( uid );
        if( !usuario ) {
            return Util.enviarMensaje(res, 'Petición denegada, primero debe autenticarse.', false, 401)
        }
        req.uid = uid;
        req.concesionarioid = usuario.concesionarioid;
        next();
    } catch (error) {
        return Util.enviarMensaje(res, 'Petición denegada, primero debe autenticarse.', false, 401)
    }
}

module.exports = {
    validarJWT
}