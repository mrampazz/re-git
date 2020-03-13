const { app, BrowserWindow } = require("electron");
const ipcMain = require("electron").ipcMain;
const isDev = require("electron-is-dev");
const dialog = require("electron").dialog;
let server = require("../server/server");
let window;

function createWindow() {
  var mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    isDev ? "http://localhost:3000/" : "http://localhost:9999/"
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function selectPath(callback) {
  let options = { properties: ["openDirectory"] };
  dialog
    .showOpenDialog(options)
    .then(result => {
      console.log(result.filePaths);
      callback(result.filePaths);
    })
    .catch(err => {
      console.log(err);
    });
}

ipcMain.on("clone", (event, arg) => {
  const simpleGit = require("simple-git")(arg.path);
  simpleGit.clone(arg.link, arg.path);
  // event.reply('cloned');
});

ipcMain.on("change-directory", (event, arg) => {
  selectPath(result => {
    event.reply("folder-selected", result);
  });
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
