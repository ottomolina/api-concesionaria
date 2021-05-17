const { request, response } = require("express")
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.models');
const Util = require('../util/util');

const insertaUsuario = async(req = request, res = response) => {
    const { nombres, apellidos, correo, password, img } = req.body
    const usuario = new Usuario({ nombres, apellidos, password, correo, img });
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    Util.responseOK(res, usuario);
}

const listaUsuario = async(req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true };
        const lista = await Usuario.find(query)
            .limit( Number(limite) )
            .skip( Number(desde) );
        const total = lista.length;
        Util.responseOK(res, {total, lista} );
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener la lista de usuarios.');
    }
}

const getUsuarioById = async(req = request, res = response) => {
    try {
        const { id = '' } = req.query;
        
        const usuario = await Usuario.findById(id);
        Util.responseOK(res, usuario );
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener la lista de usuarios.');
    }
}

const actualizaUsuario = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, correo, ...obj } = req.body;
    // Encriptar la contraseña en caso de que venga para actualizar
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        obj.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate( id, obj);
    Util.responseOK(res);
}

const eliminaUsuario = async(req = request, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    Util.responseOK(res);
}

module.exports = {
    actualizaUsuario,
    insertaUsuario,
    listaUsuario,
    eliminaUsuario,
    getUsuarioById
}
