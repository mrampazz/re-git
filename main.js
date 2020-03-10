const { app, BrowserWindow } = require('electron');
const ipcMain = require('electron').ipcMain;
const isDev = require('electron-is-dev');
const dialog = require('electron').dialog
let window;

function createWindow() {
  var mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // ricordate di cambiare la porta dopo localhost se necessario
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : 'file:///'+app.getAppPath()+'/build/index.html'
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
};

ipcMain.on('change-directory', (event) => {
  let options = { properties: ['openDirectory'] };
  dialog.showOpenDialog(options).then(result => event.reply('folder-selected', result.filePaths));
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});
