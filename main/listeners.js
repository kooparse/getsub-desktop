import {ipcMain} from 'electron'
import {mainWindow} from './windows'

export const init = () => {
  ipcMain.on('downloadFile', (event, url, savingPath) => {
    mainWindow.webContents.downloadURL(url)
    mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
      if (savingPath) item.setSavePath(savingPath)
      item.on('done', (event, state) => {
        mainWindow.webContents.send('done', state)
      })
    })
  })
}
