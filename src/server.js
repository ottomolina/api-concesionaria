const express = require('express')
const cors = require('cors');
const propReader = require('properties-reader');
const { dbConnection } = require('./database/config');

class Server {
    constructor() {
        this.props = propReader('./src/settings.properties');
        this.app = express();
        this.port = process.env.PORT;

        // Conectar con mongo
        this.conectarDB().then(() => {
            this.middlewares();
            this.routes();
        }).catch(err => {
            console.log('Error al conectar a la base de datos, por favor revise.')
            console.log('Error', err);
        });
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.props.get('com.backend.ws.routes.monitor'), require('./routes/monitor.routes'))

        this.app.use( this.props.get('com.backend.ws.routes.usuario'), require('./routes/usuario.routes'));
        this.app.use( this.props.get('com.backend.ws.routes.auth'), require('./routes/auth.routes'));
        this.app.use( this.props.get('com.backend.ws.routes.concesionario'), require('./routes/concesionario.routes'));
        this.app.use( this.props.get('com.backend.ws.routes.cliente'), require('./routes/cliente.routes'));
        
        this.app.use( this.props.get('com.backend.ws.routes.tipo'), require('./routes/tipo.routes'));
        this.app.use( this.props.get('com.backend.ws.routes.marca'), require('./routes/marca.routes'));
        this.app.use( this.props.get('com.backend.ws.routes.linea'), require('./routes/linea.routes'));
        this.app.use( this.props.get('com.backend.ws.routes.datos'), require('./routes/datos.routes'));
        
        this.app.use( this.props.get('com.backend.ws.routes.vehiculo'), require('./routes/vehiculo.routes'));
        this.app.use( this.props.get('com.backend.ws.routes.cotizacion'), require('./routes/cotizacion.routes'));

        this.app.use('*', (req, res) => res.status(404).json({mensaje: '404 | Servicio no encontrado.'}));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor iniciado en el puerto ${this.port}`);
        });
    }
}

module.exports = Server