const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    tipo: {
        type: String,
        required: [ true, 'El tipo es obligatorio.' ]
    }
});

TipoSchema.methods.toJSON = function() {
    const { __v, _id, ...tipo } = this.toObject();
    tipo.id = _id;
    return tipo;
}

module.exports = model( 'Tipo', TipoSchema );
