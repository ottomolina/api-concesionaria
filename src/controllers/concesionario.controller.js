const { request, response } = require("express")

const Concesionario = require('../models/concesionario.models');
const Util = require('../util/util');

const insertaConcesionario = async(req = request, res = response) => {
    const { nombre, direccion } = req.body;
    const creado = new Date().toLocaleString("en-US", {timeZone: "America/Guatemala"});
    const concesionario = new Concesionario({ nombre, direccion, creado });
    await concesionario.save();
    Util.responseOK(res, concesionario);
}

const listaConcesionario = async(req = request, res = response) => {
    try {
        const { limite = 10, desde = 0, id = null } = req.query;
        const query = { };
        if (id) { query.id = id }
        const lista = await Concesionario.find(query);
            // .limit( Number(limite) )
            // .skip( Number(desde) );
        // const total = (await Concesionario.find(query)).length;
        const total = lista.length;
        Util.responseOK(res, {total, lista} );
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener los datos de concesionarios.');
    }
}

const getConcesionarioById = async(req = request, res = response) => {
    try {
        const { id = '' } = req.query;
        const concesionario = await Concesionario.findById(id);
        Util.responseOK(res, concesionario);
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener los datos del concesionario.');
    }
}

const actualizaConcesionario = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, creado, ...data } = req.body;
    const obj = {};
    if(data.nombre) { obj.nombre = data.nombre; }
    if(data.direccion) { obj.direccion = data.direccion; }
    
    await Concesionario.findByIdAndUpdate( id, obj );
    Util.responseOK(res);
}

module.exports = {
    insertaConcesionario,
    listaConcesionario,
    actualizaConcesionario,
    getConcesionarioById
}
