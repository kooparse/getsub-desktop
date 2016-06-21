import {app, ipcMain} from 'electron'
import * as menu from './menu'
import * as windows from './windows'
import * as listeners from './listeners'


app.on('ready', () => {
  windows.init()

  let mainWindow = windows.mainWindow
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  menu.init()
  listeners.init()
})
