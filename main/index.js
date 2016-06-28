import os from 'os'
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

  if (process.env.NODE_ENV === 'development') mainWindow.openDevTools()

  /* Only on macOS for now... */
  if (os.platform() === 'darwin') menu.init()
  listeners.init()
})

app.on('window-all-closed', () => app.quit())
