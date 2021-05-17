const { Schema, model } = require('mongoose');

const ConcesionarioSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio.' ]
    },
    direccion: {
        type: String,
        required: [ true, 'La dirección es obligatoria.' ]
    },
    creado: {
        type: Date,
        required: [ true, 'La fecha de creación es obligatoria.' ]
    }
});


ConcesionarioSchema.methods.toJSON = function() {
    const { __v, _id, ...concesionario } = this.toObject();
    concesionario.id = _id;
    return concesionario;
}

module.exports = model( 'Concesionario', ConcesionarioSchema );
