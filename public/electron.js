const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  //uncomment this after 
  let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  //if (width>1500) width=1366
  //if (height>899) height=700
  //const width=1366, height=700

  mainWindow = new BrowserWindow({width, height, minHeight:650,minWidth:1100, show: false}); //, autoHideMenuBar: true
  mainWindow.removeMenu()
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.maximize();
  mainWindow.show();
  mainWindow.on('closed', () => mainWindow = null);
}




app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});