const { autoUpdater } = require('electron-updater');
const log = require('electron-log');


const AppUpdate = (winApp) => {

    console.log("Update:")
        // console.log(winApp)

    autoUpdater.autoDownload = true

    const sendStatusToWindow = (text) => {
        log.info(text);
        winAPP.webContents.send('message', text);
    }

    autoUpdater.on('checking-for-update', () => {
        console.log('Checking for update...');
    })

    autoUpdater.on('update-available', () => {
        // sendtatusToWindow('Atualização disponível...')
        winAPP.webContents.send('update_available');
    })

    autoUpdater.on('update-downloaded', () => {
        log.info('AutoUpdate: Download completo!');
        winAPP.webContents.send('update_downloaded');
    });

    autoUpdater.on('error', (err) => {
        log.info('Error in auto-updater :( ' + err);
    })

    autoUpdater.checkForUpdatesAndNotify()

    return winApp

}

module.exports = AppUpdate;