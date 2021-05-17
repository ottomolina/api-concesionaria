const { request, response } = require("express");

const Cotizacion = require("../models/cotizacion.models");
const Util = require("../util/util");

const insertaCotizacion = async(req = request, res = response) => {
    const { cliente, vehiculo } = req.body;
    const { uid, concesionarioid } = req;
    const creado = new Date().toLocaleString("en-US", {timeZone: "America/Guatemala"});

    const cotizacion = new Cotizacion({ agenteid: uid, concesionarioid, cliente, vehiculo, creado });
    await cotizacion.save();
    Util.responseOK(res, cotizacion);
}

const listadoCotizacion = async(req = request, res = response) => {
    try {
        const { uid, concesionarioid } = req;
        const { clienteid } = req.query;
        
        const lista = await Cotizacion.find()
                .where('cliente.id').equals(clienteid)
                .where('agenteid').equals(uid)
                .where('concesionarioid').equals(concesionarioid)
                ;
        const total = lista.length;
        Util.responseOK(res, {total, lista});
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener los datos de las cotizaciones.');
    }
}

const getClientesCotizacion = async(req = request, res = response) => {
    try{
        const { uid, concesionarioid } = req;
        const lista = await Cotizacion.find().distinct('cliente', (error, ids) => {})
                .where('concesionarioid').equals(concesionarioid);
        const total = lista.length;
        Util.responseOK(res, {total, lista} );
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener los datos de los clientes que tienen cotizaciones.');
    }
}

module.exports = {
    insertaCotizacion,
    listadoCotizacion,
    getClientesCotizacion
}
