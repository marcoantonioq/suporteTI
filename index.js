const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater');

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

ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});