const { request, response } = require("express");

const Usuario = require('../models/usuario.models');
const Util = require('../util/util');

const esAdminRol = async(req = request, res = response, next) => {
    try {
        const { uid } = req;
        const usuario = await Usuario.findById(uid);

        if ( usuario.rol !== 'ADMIN' ) {
            return Util.enviarMensaje(
                res,
                'El usuario autenticado no tiene permiso para visualizar este recurso.',
                false,
                403
            );
        }

        next();
    } catch (error) {
        console.log(error);
        return Util.enviarMensaje(res, 'Petición denegada, ocurrió un error de validación de permisos del usuario.', false, 400)
    }
}

module.exports = {
    esAdminRol
}