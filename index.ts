const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 900, height: 680, show: false});
    mainWindow.loadURL(`file://${path.join(__dirname, '/windows/mainWindow.html')}`);

    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.once('ready-to-show', () => mainWindow.show())
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
