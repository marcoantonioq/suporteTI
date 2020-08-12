'use strict';
const { remote } = require('electron');
const fs = require('fs');
const os = require('os');

const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

const settings = require('../../settings.json')

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

const connectVNC = async(event, { ip, port }, desc = "") => {
    event.preventDefault();
    const notification = {
        title: 'VNC - Receber suporte',
        body: 'Conectando...',
    }
    VNC("\\app\\exec\\IFGVNC.exe", ['-connect', `${ip}:${port}`], notification, event)
    console.log(`${ip}:${port} ${desc}`)

    return false
};

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