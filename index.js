const { app, BrowserWindow } = require('electron')

app.setAppUserModelId('suporteTI')

function createWindow() {

    let win = new BrowserWindow({
        icon: __dirname + "/app/render/static/icon.png",
        transparent: false,
        backgroundColor: '#2e2c29',
        frame: true,
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        },
        show: false,
    })
    win.webContents.on('did-finish-load', () => {
        console.log("Terminou de carregar!!!")
    })

    win.on('window-all-closed', () => {
        win = null
        app.quit()
    })

    win.once("ready-to-show", () => {
        win.show()
    })

    win.setMenu(null)
        // win.webContents.openDevTools()
    win.loadFile('./app/render/html/index.html')

}

app.whenReady().then(createWindow)