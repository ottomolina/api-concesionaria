const { request, response } = require("express");
const propReader = require('properties-reader');
const props = propReader('./src/settings.properties');

const monitor = async(req = request, res = response) => {
    const name = props.get('com.backend.name');
    const version = props.get('com.backend.version');

    res.status(200).json({ name, version });
}

module.exports = {
    monitor
}