"use strict";
const { remote, shell, ipcRenderer } = require('electron');
const settings = require("../../settings.json");
const { getSolutions } = require("../../solutions.js");
const { infoSystem } = require("../../modules/System");
const { listenerVNC, connectVNC } = require("../../modules/VNC");
const { hostsActives } = require("../../modules/Net");

/**
 * Objeto app VueJS
 */
var appVRender = new Vue({
    el: '#appVRender',
    data() {
        return {
            message: `Olá ${infoSystem.username}! `,
            description: '',
            system: infoSystem,
            app_version: remote.app.getVersion(),
            servidor_enable: { ip: null, port: null },
            servidores_reachable: [],
        }
    },
    methods: {
        openUrl: function(url) {
            (async() => {
                shell.openExternal(url)
            })()
        },
        hide: (el) => el.classList.add("hide"),
        show: (el) => el.classList.remove("hide"),
        connect: async function(event) {
            if (!this.servidor_enable.ip) {
                M.toast({ html: ':( Nenhum computador encontrado!' })
            } else {
                if (this.description) {
                    let progress = document.querySelector("#progress")
                    this.show(progress)
                    connectVNC(event, this.servidor_enable, this.description)
                        .then(data => this.hide(progress))
                } else {
                    M.toast({ html: 'Por favor, informe uma descrição!!!' })
                }
            }
        },
        listener: function(event) {
            let progress = document.querySelector("#progress")
            this.show(progress)
            listenerVNC(event)
                .then(data => this.hide(progress))
        },
        /**
         * Atualiza a lista de hosts ativos
         */
        updateReachable: async function(ev) {

            let isUpdateServers = (ev === 'update' && this.servidores_reachable.length > 0)

            if (isUpdateServers) {
                console.log('Lista de servidores não atualizada!!!')
                return false
            }

            let servidores = await Promise.all([
                // hostsActives(), // net local
                hostsActives(settings.servers)
            ])

            let setValues = hosts => hosts.forEach(host => {
                this.servidor_enable = host
                this.servidores_reachable.push(host)
            });

            this.servidores_reachable = []
            servidores.forEach(listHosts => setValues(listHosts))

            this.servidores_reachable.length > 0 &&
                M.toast({ html: `${this.servidores_reachable.length} computador pronto para iniciar o suporte! ` }) ||
                M.toast({ html: `Nenhum computador para iniciar o suporte! ` })

            console.log(this.servidores_reachable)
        },
        restartApp: function(event) {
            ipcRenderer.send('restart_app');
        },
        close: function(event) {
            remote.BrowserWindow.getFocusedWindow().close()
        }
    },
    computed: {
        apiSolution: function() {
            return getSolutions(this.description)
        }
    },
    watch: {},
    created: function() {
        M.toast({ html: this.message })
    }
})

document.addEventListener("DOMContentLoaded", function(event) {
    (async() => {

        let options = {}
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {});

        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, options);

        var elems = document.querySelectorAll('.tabs');
        var instance = M.Tabs.init(elems, options);

        ipcRenderer.on('message', (event, arg) => {
            M.toast({ html: arg })
        });

        const updating = document.getElementById('updating');
        const btnUpdating = updating.querySelector('button')

        ipcRenderer.on('update_available', () => {
            ipcRenderer.removeAllListeners('update_available');
            M.toast({ html: 'Uma nova atualização está disponível. Baixando agora ...' })

            updating.classList.remove('hidden');
            btnUpdating.classList.add('disabled')
            btnUpdating.querySelector('span').innerHTML = 'Baixando...'
        });
        ipcRenderer.on('update_downloaded', () => {
            // ipcRenderer.removeAllListeners('update_downloaded');
            M.toast({ html: 'Atualização baixada. Ele será instalado na reinicialização. Reinicie agora?' })
            updating.classList.remove('hidden');
            btnUpdating.classList.remove('disabled')
            btnUpdating.querySelector('span').innerHTML = 'Atualizar'
        });
    })();
});