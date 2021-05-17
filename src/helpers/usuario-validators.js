const Usuario = require("../models/usuario.models");


const existeCorreo = async( correo = '' ) => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya está registrado.`);
    }
}

const existeUsuarioPorId = async( id = '' ) => {
    // Verificar que el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario con id: ${id} no está registrado.`);
    }
}

module.exports = {
    existeCorreo,
    existeUsuarioPorId
}