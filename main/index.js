const electron = require('electron')
const path = require('path')
const {app, ipcMain, BrowserWindow} = electron
let win


app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 450,
    minHeight: 450,
    fullscreenable: false,
    title: 'Getsub'
  })
  win.loadURL(`file://${path.resolve(__dirname, '..')}/renderer/index.html`)
  win.on('closed', () => {
   win = null
  })
})


ipcMain.on('downloadFile', (event, url, savingPath) => {
  win.webContents.downloadURL(url)
  win.webContents.session.on('will-download', (event, item, webContents) => {
    if (savingPath) item.setSavePath(savingPath)
    item.on('done', (event, state) => {
      win.webContents.send('done', state)
    })
  })
})
