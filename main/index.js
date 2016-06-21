import {app, ipcMain, BrowserWindow} from 'electron'
import path from 'path'
let win


const appPath = process.env.NODE_ENV === 'production'
  ? `${__dirname}/index.html`
  : `${path.resolve(__dirname, '..')}/renderer/index.html`

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 450,
    minHeight: 450,
    fullscreenable: false,
    title: 'Getsub'
  })

  win.loadURL(`file://${appPath}`)
  win.on('closed', () => win = null)
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
