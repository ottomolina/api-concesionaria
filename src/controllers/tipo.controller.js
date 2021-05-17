const { request, response } = require("express");

const Tipo = require('../models/tipo.models');
const Util = require('../util/util');

const insertaTipo = async(req = request, res = response) => {
    const { tipo } = req.body;
    const tipoObj = new Tipo({ tipo });
    await tipoObj.save();
    Util.responseOK(res, { tipo: tipoObj });
}

 const listadoTipos = async(req = request, res = response) => {
    try {
        const lista = await Tipo.find();
        const total = lista.length;
        Util.responseOK(res, {total, lista} );
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener los datos de tipos de vehículos.');
    }
}

const actualizaTipo = async(req = request, res = response) => {
    const { id } = req.params;
    const { tipo } = req.body;
    
    await Tipo.findByIdAndUpdate( id, { tipo });
    Util.responseOK(res);
}

module.exports = {
    insertaTipo,
    listadoTipos,
    actualizaTipo
}
