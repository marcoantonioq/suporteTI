const { app, BrowserWindow } = require('electron');

function createWindow() {
  let win = new BrowserWindow({
    // icon: __dirname + '/public/img/icons/icon.png',
    transparent: false,
    backgroundColor: '#2e2c29',
    frame: true,
    width: 720,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });

  win.on('window-all-closed', () => {
    win = null;
    app.quit();
  });

  win.once('ready-to-show', () => {
    win.show();
  });

  win.webContents.on('did-finish-load', () => {
    console.log('Terminou de carregar!!!');
  });

  win.setMenu(null);
  win.webContents.openDevTools();
  win.loadFile('./public/index.html');
}

app.whenReady().then(createWindow);
