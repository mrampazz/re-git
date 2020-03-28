const { app, BrowserWindow } = require("electron");
const ipcMain = require("electron").ipcMain;
const isDev = require("electron-is-dev");
const dialog = require("electron").dialog;
const fs = require('fs');
let server = require("../server/server");
let window;
console.log(app.getAppPath() + "/src/temp/"+"flixy");
function createWindow() {
  var mainWindow = new BrowserWindow({
    width: 1024,
    height: 548,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
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
  const simpleGit = require("simple-git/promise")();
  let path = app.getAppPath() + "/" + arg.name;
  if (!fs.existsSync(path)){
    fs.mkdirSync(arg.name);
    simpleGit.clone(arg.cloneUrl, path)
      .then(() => event.reply("cloned", arg.name));
  } else {
    simpleGit.clone(arg.cloneUrl, path).then(
      () => event.reply("cloned")
     );
  }
  
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
