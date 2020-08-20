const { remote, shell } = require('electron');
const settings = require("../../settings.json");
const { getSolutions } = require("../../solutions.js");
const { infoSystem } = require("../module/System");
const { listenerVNC, connectVNC } = require("../module/VNC");
const { hostsActives } = require("../module/Net");

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
        updateReachable: async function() {

            let servidores = await Promise.all([
                hostsActives(), // net local
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
    })();
});