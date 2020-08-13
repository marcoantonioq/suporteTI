'use strict';
const { remote } = require('electron');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

/**
 * Executa o comando VNC
 * @param {string} run Comando a ser executado
 * @param {array} params Parâmetros a serem executados
 * @param {object} notification Objeto notificação {title:..,body:...}
 * @param {object} event Evenco onClick
 */
const VNC = async(run, params, notification, event) => {
    new window.Notification(notification.title, notification)
    let btnClick = event.target
    btnClick.classList.add("disabled")
    const { stdout } = await execFile(remote.app.getAppPath() + run, params)
    notification.body = 'Acesso encerrado. Para continuar o atendimento clique em conectar!!!';
    new window.Notification(notification.title, notification);
    btnClick.classList.remove("disabled");
    return stdout
};

/**
 * Conecta em host enviado
 * @param {object} event Evento enviado onClick
 * @param {object} host Objeto host {ip:... ,port:...}
 */
const connectVNC = async(event, { ip, port }) => {
    event.preventDefault();
    const notification = {
        title: 'VNC - Receber suporte',
        body: 'Conectando...',
    }
    VNC("\\app\\exec\\IFGVNC.exe", ['-connect', `${ip}:${port}`], notification, event)

    return false
};

/**
 * Inicia o VNC em modo listener
 * @param {object} event Objeto event onClick
 */
const listenerVNC = async(event) => {
    event.preventDefault();
    const notification = {
        title: 'VNC - Conceder suporte',
        body: 'Pronto para conceder suporte!',
    }

    console.log("Vamos executar o view")
    const process = await VNC(
        "\\app\\exec\\vncviewer.exe", [
            '-listen', '5901',
            '-enablecache',
            '-disablesponsor',
            '-nostatus'
        ], notification, event
    )
    return false
};

module.exports = {
    connectVNC,
    listenerVNC
}