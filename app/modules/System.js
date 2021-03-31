'use strict';
const ip = require('ip');
const os = require('os');


/**
 * Informações IPv4 do SO
 */
var redes = Object.values(os.networkInterfaces())
    .map(board => board.filter(
        net => net.family == "IPv4" &&
        ip.isPrivate(net.address) &&
        !net.cidr.includes('127.0.0')
    ))
    .filter(net => net.length > 0)

var networks = redes.map(net => {
    return {
        "network": net[0]['cidr'],
        "ports": ["9001"]
    }
});

/**
 * Coleta informações do sistema operacional
 */
const infoSystem = {
    username: os.userInfo().username.toUpperCase(),
    hostname: os.hostname(),
    networks: redes.map(net => `${net[0]['cidr']}`),
    hostversion: os.platform() + " " + os.release(),
}

module.exports = {
    infoSystem,
    networks,
}