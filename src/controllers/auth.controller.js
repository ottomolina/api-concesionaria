const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.models');
const Util = require('../util/util');

const { generaJwT } = require("../helpers/generar-jwt");

const login = async(req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        // Verificar que el usuario existe
        const usuario = await Usuario.findOne({ correo });
        // console.log(usuario);
        if ( !usuario ) {
            return Util.enviarMensaje(res, 'Usuario o contraseña incorrectos.', 401);
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if ( !validPassword ) {
            return Util.enviarMensaje(res, 'Usuario o contraseña incorrectos.', 401);
        }
        // Verificar si el usuario está activo
        if ( !usuario.estado ) {
            return Util.enviarMensaje(res, 'Usuario o contraseña incorrectos.', 401);
        }
        // Generar el JWT
        const token = await generaJwT( usuario.id );
        Util.responseOK(res, { usuario, token });
    } catch (error) {
        console.log('', error);
        Util.enviarMensajeError(res, 'Ocurrió un error al autenticarse, consulte al administrador.');
    }
}

module.exports = {
    login
}