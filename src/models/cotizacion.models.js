const { Schema, model } = require('mongoose');

const CotizacionSchema = Schema({
    agenteid: {
        type: String,
        required: [ true, 'El identificador del agente es obligatorio.' ]
    },
    cliente: {
        type: Object,
        required: [ true, 'Los datos del cliente son obligatorios.' ]
    },
    vehiculo: {
        type: Object,
        required: [ true, 'Los datos del vehículo son obligatorios.' ]
    },
    concesionarioid: {
        type: String,
        required: [ true, 'El identificador del concesionario es obligatorio.' ]
    },
    creado: {
        type: Date,
        required: [ true, 'La fecha de creación es obligatoria.' ]
    }
});


CotizacionSchema.methods.toJSON = function() {
    const { __v, _id, ...cotizacion } = this.toObject();
    cotizacion.id = _id;
    return cotizacion;
}

module.exports = model( 'Cotizacion', CotizacionSchema );
