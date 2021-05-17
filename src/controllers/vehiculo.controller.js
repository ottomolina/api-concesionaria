const { request, response } = require("express");

const Vehiculo = require("../models/vehiculo.models");
const Util = require('../util/util');

const insertarVehiculo = async(req = request, res = response) => {
    const { tipo, marca, linea, cc, color, modelo, precio } = req.body;

    const vehiculo = new Vehiculo({ tipo, marca, linea, cc, color, modelo, precio });
    await vehiculo.save();
    Util.responseOK(res, vehiculo);
}

const listadoVehiculos = async(req = request, res = response) => {
    try {
        const { tipo, marca, linea, modelo } = req.query;
        const query = { };
        if(tipo) { query.tipo = tipo; };
        if(marca) { query.marca = marca; };
        if(linea) { query.linea = linea; };
        if(modelo) { query.modelo = modelo; };

        const lista = await Vehiculo.find(query);
        const total = lista.length;
        Util.responseOK(res, {total, lista} );
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener los datos de vehículos.');
    }
}

const actualizarVehiculo = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, tipo, marca, linea, cc, color, modelo, precio } = req.body;
    const obj = {  };
    if(tipo) { obj.tipo = tipo; }
    if(marca) { obj.marca = marca; }
    if(linea) { obj.linea = linea; }
    if(cc) { obj.cc = cc; }
    if(color) { obj.color = color; }
    if(modelo) { obj.modelo = modelo; }
    if(precio) { obj.precio = precio; }

    await Vehiculo.findByIdAndUpdate( id, obj );
    Util.responseOK(res);
}

module.exports = {
    insertarVehiculo,
    listadoVehiculos,
    actualizarVehiculo
}
