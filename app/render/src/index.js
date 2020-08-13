const { remote, shell } = require('electron');
const settings = require("../../settings.json");
const { getSolutions } = require("../../solutions.js");
const { infoSystem, servers } = require("../module/System");
const { listenerVNC, connectVNC } = require("../module/VNC");
const { isReachable, ipV4Range } = require("../module/Net");


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
                this.updateReachable().then(data => {
                    M.toast({ html: ':) Tente novamente!!!' })
                        // this.connect()
                })
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
        setServer: function(el) {
            this.servidor_enable = el
        },
        /**
         * Atualiza a lista de hosts ativos
         */
        updateReachable: async function() {
            const updateHostsActived = async server => {
                let ips = []
                let subnet = ipV4Range(server.network)
                let maskSubNet = subnet.subnetMaskLength
                if (maskSubNet > 23 && maskSubNet <= 32) {
                    subnet.ips.forEach(ip => {
                        server.ports.forEach(port => {
                            ips.push({ ip: ip, port: port, status: false })
                        })
                    })
                    Promise.all(
                        ips.map(async host => {
                            host["status"] = await isReachable(host)
                            return host
                        })
                    ).then((values) => {
                        values
                            .filter(hosts => hosts.status === true)
                            .forEach(host => {
                                this.setServer(host)
                                this.servidores_reachable.push(host)
                            })
                        if (this.servidores_reachable.length > 0)
                            M.toast({ html: `${this.servidores_reachable.length} computador pronto para iniciar o suporte! ` })
                    });
                }
            }
            this.servidores_reachable = []
            servers.forEach(updateHostsActived)
            settings.servers.forEach(updateHostsActived)
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
        this.updateReachable()

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