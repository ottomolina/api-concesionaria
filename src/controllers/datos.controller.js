const { request, response } = require("express");

const Util = require("../util/util");
const Tipo = require("../models/tipo.models");
const Marca = require("../models/marca.models");
const Linea = require("../models/linea.models");

const listadoDatos = async(req = request, res = response) => {
    try {
        const listaTipos = await Tipo.find();
        const listaMarcas = await Marca.find();
        const listaLineas = await Linea.find();
        
        Util.responseOK(res, {
            tipos: listaTipos,
            marcas: listaMarcas,
            lineas: listaLineas
        });
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener los datos de las cotizaciones.');
    }
}

module.exports = {
    listadoDatos
}
