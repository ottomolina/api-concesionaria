const { response } = require("express");

const OK = { codigo: 0 }
const ERROR = { codigo: 1 }

const responseOK = (res = response, data = undefined) => {
    data
    ? res.status(200).json({ ...OK, mensaje: 'Consulta exitosa.', data })
    : res.status(200).json({ ...OK, mensaje: 'Consulta exitosa.' })
}

const integridad = (res = response) => {
    res.json({
        ...ERROR,
         mensaje: `Para proteger la integridad de la información, no es posible eliminar este registro.`
    });
}

const enviarMensaje = (res = response, texto = String, status = undefined) => {
    status 
        ? res.status(status).json({ ...ERROR, mensaje: texto })
        : res.status(200).json({ ...OK, mensaje: texto })
}

const enviarMensajeError = (res = response, texto = String) => {
    res.status(500).json({ ...ERROR, mensaje: texto });
}

module.exports = {
    integridad,
    enviarMensaje,
    enviarMensajeError,
    responseOK
}
