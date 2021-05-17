const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( 
            process.env.MONGODB_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );
        console.log('Conexión exitosa');
    } catch (error) {
        console.log('Error dbConnection', error);
        throw new Error('Error al conectar a la base de datos.');
    }
}

module.exports = {
    dbConnection
}
