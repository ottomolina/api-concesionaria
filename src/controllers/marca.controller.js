const { request, response } = require("express")

const Marca = require('../models/marca.models');
const Util = require('../util/util');

const insertaMarca = async(req = request, res = response) => {
    const { marca } = req.body;

    const marcaObj = new Marca({ marca });
    await marcaObj.save();
    Util.responseOK(res, { marca: marcaObj });
}

const listadoMarcas = async(req = request, res = response) => {
    try {
        const lista = await Marca.find();
        const total = lista.length;
        Util.responseOK(res, {total, lista} );
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener los datos de marcas de vehículos.');
    }
}

const actualizarMarca = async(req = request, res = response) => {
    const { id } = req.params;
    const { marca } = req.body;

    await Marca.findByIdAndUpdate( id, { marca } );
    Util.responseOK(res);
}


module.exports = {
    insertaMarca,
    listadoMarcas,
    actualizarMarca
}
