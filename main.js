const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { sequelize, Data } = require('./models/data');

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile('index.html');
}

ipcMain.on('save-data', async (event, data) => {
  try {
    await Data.create(data);
    console.log('Данные сохранены:', data.name);
  } catch (error) {
    console.error('Ошибка сохранения данных:', error);
    event.reply('error', 'Ошибка сохранения данных.');
  }
});

ipcMain.on('request-data', async (event) => {
  try {
    const items = await Data.findAll();
    event.reply('data-list', items);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
});

app.whenReady().then(async () => {
  await sequelize.sync();
  createWindow();
});
