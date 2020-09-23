const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

autoUpdater.autoDownload = true
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

app.setAppUserModelId('suporteTI')

let win

function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
}

function createWindow() {

    win = new BrowserWindow({
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
        console.log("URL: ", autoUpdater.getFeedURL())
    })

    win.on('window-all-closed', () => {
        win = null
        app.quit()
    })

    win.once("ready-to-show", () => {
        win.show()
            // sendStatusToWindow('Now: checkForUpdatesAndNotify');
            // autoUpdater.checkForUpdatesAndNotify();
    })

    win.setMenu(null)
        // win.webContents.openDevTools()
    win.loadFile('./app/render/html/index.html')

    ipcMain.on('app_version', (event) => {
        event.sender.send('app_version', { version: app.getVersion() });
    });

    ipcMain.on('restart_app', () => {
        sendStatusToWindow('Vamos iniciar a atualização!');
        autoUpdater.quitAndInstall();
    });

    autoUpdater.on('checking-for-update', () => {
        sendStatusToWindow('Checking for update...');
    })

    autoUpdater.on('update-available', () => {
        sendStatusToWindow('Update available.');
        win.webContents.send('update_available');
    });
    autoUpdater.on('update-available', (info) => {
        sendStatusToWindow('Update available: ' + info);
        autoUpdater.downloadUpdate().then((path) => {
            sendstatustowindow('Download path', path)
        }).catch((e) => {
            sendstatustowindow('Erro update update-availabre: ' + e)
        })
    })
    autoUpdater.on('update-downloaded', () => {
        sendStatusToWindow('Update available.');
        win.webContents.send('update_downloaded');
    });
    autoUpdater.on('update-not-available', (info) => {
        sendStatusToWindow('Update not available.');
    })
    autoUpdater.on('error', (err) => {
        sendStatusToWindow('Error in auto-updater. ' + err);
    })

}

app.whenReady().then(createWindow)