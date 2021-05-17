const { Schema, model } = require('mongoose');

const MarcaSchema = Schema({
    marca: {
        type: String,
        required: [ true, 'La marca es obligatoria.' ]
    }
});


MarcaSchema.methods.toJSON = function() {
    const { __v, _id, ...linea } = this.toObject();
    linea.id = _id;
    return linea;
}

module.exports = model( 'Marca', MarcaSchema );
