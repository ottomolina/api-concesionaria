const jwt = require('jsonwebtoken');

const generaJwT = ( uid = '' ) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign( payload, process.env.SECRETKEY, {
            expiresIn: process.env.TOKEN_EXPIRE
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject( 'Ocurrió un error al generar el token.' );
            } else {
                resolve( token );
            }
        })
    });
}

module.exports = {
    generaJwT
}