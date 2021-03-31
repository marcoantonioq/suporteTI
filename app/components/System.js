'use strict';
const os = require('os');
import { valid } from './Helpers/Validation.js';
/**
 * Informações SO
 */
export const SO = {
  username: os.userInfo().username.toUpperCase(),
  hostname: os.hostname(),
  version: os.platform() + ' ' + os.release(),
  infoSystem: os,
  networks: Object.values(os.networkInterfaces()).flat(),
  /**
   * Filtra IPsV4 válidos
   * @returns {Array<IP>} Array de ips
   */
  publicIpV4() {
    return this.networks.filter((net) => {
      return (
        valid.ipIsPrivate(net.address) &&
        valid.include(net.family)('IPv4') &&
        !valid.include(net.cidr)('127.0.0')
      );
    });
  },
  toHtml() {
    const nets = this.publicIpV4().map((net) => net['cidr']);
    return `
      <h6>Computador: ${this.hostname} / ${this.version}</h6>
      <h6>Redes: ${nets} </h6>
  `;
  },
};
