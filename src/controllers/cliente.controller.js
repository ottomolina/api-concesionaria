const { request, response } = require("express")

const Cliente = require('../models/cliente.models');
const Util = require('../util/util');

const insertarCliente = async(req = request, res = response) => {
    const { nombres, apellidos, telefono, correo, direccion,
        nacimiento, genero, ocupacion, ingresos } = req.body;
    const concesionarioid = req.concesionarioid;
    const creado = new Date().toLocaleString("en-US", {timeZone: "America/Guatemala"});

    const cliente = new Cliente({ nombres, apellidos, telefono, correo, direccion, 
        nacimiento, genero, ocupacion, ingresos, concesionarioid, creado });
    await cliente.save();
    Util.responseOK(res, cliente);
}

const listadoClientes = async(req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { };
        const lista = await Cliente.find(query)
            // .limit( Number(limite) )
            // .skip( Number(desde) );
        const total = lista.length;
        Util.responseOK(res, {total, lista} );
    } catch (error) {
        console.log(error);
        Util.enviarMensajeError(res, 'Ocurrió un error al obtener los datos de clientes.');
    }
}

const actualizaCliente = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, creado, concesionarioid, nombres, apellidos, telefono, correo, direccion,
        nacimiento, genero, ocupacion, ingresos } = req.body;
    const obj = {};
    if(nombres) { obj.nombres = nombres; }
    if(apellidos) { obj.apellidos = apellidos; }
    if(telefono) { obj.telefono = telefono; }
    if(correo) { obj.correo = correo; }
    if(direccion) { obj.direccion = direccion; }
    if(nacimiento) { obj.nacimiento = nacimiento; }
    if(genero) { obj.genero = genero; }
    if(ocupacion) { obj.ocupacion = ocupacion; }
    if(ingresos) { obj.ingresos = ingresos; }

    await Cliente.findByIdAndUpdate( id, obj );
    Util.responseOK(res);
}

module.exports = {
    insertarCliente,
    listadoClientes,
    actualizaCliente
}
