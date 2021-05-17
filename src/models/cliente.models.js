const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombres: {
        type: String,
        required: [ true, 'El nombre es obligatorio.' ]
    },
    apellidos: {
        type: String,
        required: [ true, 'El apellido es obligatorio.' ]
    },
    telefono: {
        type: String,
        required: [ true, 'El teléfono es obligatorio.' ]
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio.' ]
    },
    direccion: {
        type: String,
        required: [ true, 'La dirección es obligatoria.' ]
    },
    nacimiento: {
        type: Date,
        required: [ true, 'La fecha de nacimiento es obligatoria.' ]
    },
    genero: {
        type: String,
        required: [ true, 'El género del cliente es obligatorio.' ]
    },
    ocupacion: {
        type: String,
        required: [ true, 'La ocupación del cliente es obligatoria.' ]
    },
    ingresos: {
        type: Number,
        required: [ true, 'El campo ingresos es obligatorio.' ]
    },
    creado: {
        type: Date,
        required: [ true, 'La fecha de creación es obligatoria.' ]
    }
});


ClienteSchema.methods.toJSON = function() {
    const { __v, _id, ...cliente } = this.toObject();
    cliente.id = _id;
    return cliente;
}

module.exports = model( 'Cliente', ClienteSchema );
