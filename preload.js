const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  sendData: (data) => ipcRenderer.send('save-data', data),
  getData: () => ipcRenderer.send('request-data'),
  onDataList: (callback) => ipcRenderer.on('data-list', (event, dataItems) => callback(dataItems)),
  onError: (callback) => ipcRenderer.on('error', (event, errorMessage) => callback(errorMessage)),
});
