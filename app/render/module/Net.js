'use strict';;
const net = require('net');
const ip = require("ip");
const { networks } = require("../module/System");
const { isString } = require('util');

/**
 * Função que verifica se porta no host está ativa
 * @param {number} port Porta de rede
 * @param {object} param1 Objeto contendo o host {host:'192.168.1.1'}
 * @return {boolean} Retorna true || false
 */
const isReachable = async({ timeout = 2000, ip, port } = {}) => {

    const promise = new Promise(((resolve, reject) => {
        const socket = new net.Socket();

        const onError = () => {
            socket.destroy();
            reject();
        };

        socket.setTimeout(timeout);
        socket.once('error', onError);
        socket.once('timeout', onError);

        socket.connect(port, ip, () => {
            socket.end();
            resolve();
        });
    }));

    try {
        await promise;
        return { ip: ip, port: port, status: true };
    } catch (_) {
        return { ip: ip, port: port, status: false };
    }
};

/**
 * Transforma o CIDR informado em lista de IPs
 * @param {string} cidrIp Rede no formato CIDR
 * @return {array} Retorna lista de ip 
 */
const ipV4Range = (cidrIp) => {
    let subnet = ip.cidrSubnet(cidrIp); // DeprecarionWarning 
    let maskSubNet = subnet.subnetMaskLength

    subnet["ips"] = [];
    if (maskSubNet > 23 && maskSubNet <= 32) { // calcula subRede entre 23 e 32
        let firstAddressLong = ip.toLong(subnet.firstAddress);
        const lastAddressLong = ip.toLong(subnet.lastAddress);

        for (firstAddressLong; firstAddressLong <= lastAddressLong; firstAddressLong++)
            subnet["ips"].push(ip.fromLong(firstAddressLong));
    }

    return subnet;
}

const hostsActives = async(servers = networks) => {
    isString(servers) &&
        (servers = [{ network: servers, ports: [5901] }])

    let ips = []
    servers.forEach(server => {
        ipV4Range(server.network)
            .ips.forEach(ip => {
                server.ports.forEach(port => {
                    ips.push({ ip: ip, port: port, status: false })
                })
            })
    })
    return (await Promise.all(
        ips.map(isReachable)
    )).filter(hosts => hosts.status === true)
}

module.exports = {
    hostsActives
}