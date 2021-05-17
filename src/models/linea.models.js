const { Schema, model } = require('mongoose');

const LineaSchema = Schema({
    marcaid: {
        type: String,
        required: [ true, 'El identificador de la marca es obligatorio.' ]
    },
    linea: {
        type: String,
        required: [ true, 'La línea es obligatoria.' ]
    }
});


LineaSchema.methods.toJSON = function() {
    const { __v, _id, ...linea } = this.toObject();
    linea.id = _id;
    return linea;
}

module.exports = model( 'Linea', LineaSchema );
