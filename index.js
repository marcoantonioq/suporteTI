const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

const AppUpdate = async(win) => {
    autoUpdater.autoDownload = true
    autoUpdater.on('error', (e) => {
        log.info('Error in auto-updater :( ' + e);
    })
    autoUpdater.checkForUpdatesAndNotify()
}

function createWindow() {

    log.info('App starting...');

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

    win.on('window-all-closed', () => {
        win = null
        app.quit()
    })

    win.once("ready-to-show", () => {
        win.show()
        AppUpdate(win)
    })

    win.webContents.on('did-finish-load', () => {
        console.log("Terminou de carregar!!!")
    })

    win.setMenu(null)
    win.webContents.openDevTools()
    win.loadFile('./app/render/html/index.html')

}

app.whenReady()
    .then(createWindow)