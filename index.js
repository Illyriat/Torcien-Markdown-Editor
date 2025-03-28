const { app, BrowserWindow, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');

const menu = require('./menu');

let window;

app.on('ready', () => {
  window = new BrowserWindow({ width: 1400, height: 900, webPreferences: { nodeIntegration: true } });
  window.loadFile('index.html');
  autoUpdater.checkForUpdatesAndNotify();
});

Menu.setApplicationMenu(menu);