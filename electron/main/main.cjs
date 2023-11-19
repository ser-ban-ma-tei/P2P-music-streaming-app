const { app, BrowserWindow, ipcMain } = require('electron');
const { handlersMap } = require('../handlers/handlersMap.cjs');
const path = require('path'); 
require('cross-fetch/polyfill');

const createWindow = () => {
  const window = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '../preload_scripts/preload.cjs'),
    },
  });
  window.maximize();
  window.setResizable(false);

  handlersMap.forEach(({ handlerName, handler }) =>
    ipcMain.handle(handlerName, handler)
  );

  window.loadURL('http://localhost:5173');
};

app.whenReady().then(async () => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', async () => {
  try {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  } catch (error) {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }
});
