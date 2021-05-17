const Concesionario = require('../models/concesionario.models');

const existeConcesionarioPorId = async( id = '' ) => {
    // Verificar si existe el concesionario
    const existeConcesionario = await Concesionario.findById( id );
    if(!existeConcesionario) {
        throw new Error(`El concesionario con id: ${id} no está registrado.`);
    }
}

module.exports = {
    existeConcesionarioPorId
}