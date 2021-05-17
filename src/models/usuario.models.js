
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombres: {
        type: String,
        required: [true, 'El campo nombres es obligatorio.']
    },
    apellidos: {
        type: String,
        required: [true, 'El campo apellidos es obligatorio.']
    },
    correo: {
        type: String,
        required: [true, 'El campo correo es obligatorio.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El campo contraseña es obligatoria.']
    },
    concesionarioid: {
        type: String,
        default: ''
    },
    estado: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        default: ''
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
