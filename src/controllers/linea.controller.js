const { request, response } = require("express");

const Linea = require('../models/linea.models');
const Marca = require('../models/marca.models');
const Util = require('../util/util');

const insertaLinea = async(req = request, res = response) => {
    const { marcaid, linea } = req.body;
    const lineaObj = new Linea({ marcaid, linea });
    await lineaObj.save();
    Util.responseOK(res, { linea: lineaObj });
}

const listadoLineas = async(req = request, res = response) => {
    try {
        const { marcaid } = req.query;
        const query = { };
        if(marcaid) { 
            query.marcaid = marcaid;
        };
        
        const listaMarcas = await Marca.find();
        const lista = await Linea.find(query);
        const total = lista.length;

        const listado = [];
        lista.forEach(element => {
            const { _id, marcaid, linea, marca } = element;
            let obj = { id: _id, marcaid, linea, marca };
            obj.marca = listaMarcas.find(el => el.id === marcaid).marca;
            listado.push(obj);
        });
        
        Util.responseOK(res, {total, lista: listado } );
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener la lista de líneas de vehículos.');
    }
}

const actualizaLinea = async(req = request, res = response) => {
    const { id } = req.params;
    const { marcaid, linea } = req.body;
    
    await Linea.findByIdAndUpdate( id, { marcaid, linea });
    Util.responseOK(res);
}

module.exports = {
    insertaLinea,
    listadoLineas,
    actualizaLinea
}
