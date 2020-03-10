## React + Electron
Questo è il boilerplate completato, tuttavia vi consiglio di seguire tutti i passaggi che vi ho elencato così da riuscire a creare una vostra app.

### Prerequisiti
- nodejs
- npm

Installando nodejs dovreste già avere npm. Per controllare basta provare a scrivere in console:
`node -v` e `npm -v`. Questi comandi dovrebbero ritornare le versioni di nodejs e npm.

### Creare un progetto React
Per prima cosa creare un progetto vuoto di React con il primo comando, il terzo comando servirà a far partire la vostra web app su un server localhost. (dovrebbe aprirsi una pagina web con indirizzo localhost:xxxx dove xxxx è la porta).
```
npx create-react-app nome-della-vostra-app
cd nome-della-vostra-app
npm start
```
Ricordate di chiudere la vostra app prima di installare le dipendenze, se avete fatto `npm start` potete chiuderla con CTRL+C quando siete nella console.

### Installare dipendenze
Ricordatevi per prima cosa di essere nella cartella dell'applicazione appena creata. In questo esempio: *nome-della-vostra-app*.
- Installate electron:
```
npm install electron
```
- Installate electron-builder (serve per impacchettare e buildare la vostra app, -D è un alias per --save-dev quindi vi salva electron-builder come una dipendenza per i developers)
```
npm i -D electron-builder
```

- Installare electron-is-dev (serve per far capire se l'app viene lanciata in development o production)
```
npm install electron-is-dev
```

### Configurazione
Ora aprite il file *package.json* e modificatelo aggiungendo, dopo `"private": true,`:
```
"homepage": "./",
"main": "src/start.js",
"build": {
    "appId": "some.id.ofyours",
    "directories": {
      "buildResources": "assets"
    },
    "win": {
      "category": "your.app.category.type",
      "iconUrl": "path-to-icon.png"
    },
    "mac": {
      "category": "your.app.category.type",
      "iconUrl": "path-to-icon.png"
    }
  },
```
e 
`"electron": "electron .",` come primo elemento nell'oggetto json "scripts" in modo da ottenere:
```
"scripts": {
    "electron": "electron .",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```
### Creazione del file start.js
Il file start.js server per dire a electron che cosa deve fare quando viene chiamato il comando: `npm run electron`, inseriamo il file start.js dentro la cartella src. Nella configurazione abbiamo già inserito il puntatore a questo file nell'attributo "main".

```
const electron = require('electron')
const app = electron.app
const path = require('path')
const isDev = require('electron-is-dev')
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // ricordate di cambiare la porta dopo localhost se necessario
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
```
### Conclusione
Ora per far partire la vostra web app:
```
npm start
```
Questo comando vi aprirà un server nodejs nella porta xxxx, a questo punto aprite una nuova console, andate nella cartella della vostra applicazione e scrivete il comando:
```
npm run electron
```