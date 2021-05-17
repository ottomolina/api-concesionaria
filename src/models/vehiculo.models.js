const { Schema, model } = require('mongoose');

const VehiculoSchema = Schema({
    tipo: {
        type: String,
        required: [ true, 'El tipo es obligatorio.' ]
    },
    marca: {
        type: String,
        required: [ true, 'La marca es obligatoria.' ]
    },
    linea: {
        type: String,
        required: [ true, 'La línea es obligatoria.' ]
    },
    cc: {
        type: Number,
        required: [ true, 'El cilindraje del vehículo es obligatorio.' ]
    },
    color: {
        type: String,
        required: [ true, 'El color del vehículo es obligatorio.' ]
    },
    modelo: {
        type: String,
        required: [ true, 'La modelo del vehículo es obligatorio.' ]
    },
    precio: {
        type: Number,
        required: [ true, 'El precio del vehículo es obligatorio.' ]
    }
});


VehiculoSchema.methods.toJSON = function() {
    const { __v, _id, ...vehiculo } = this.toObject();
    vehiculo.id = _id;
    return vehiculo;
}

module.exports = model( 'Vehiculo', VehiculoSchema );
