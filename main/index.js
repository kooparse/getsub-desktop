import squirrel from 'electron-squirrel-startup'
import os from 'os'
import {app, ipcMain, globalShortcut} from 'electron'
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

  globalShortcut.register('CommandOrControl+Q', () => app.quit())

  /* Only on macOS for now... */
  if (os.platform() === 'darwin') menu.init()
  listeners.init()
})

app.on('will-quit', () => globalShortcut.unregisterAll())
app.on('window-all-closed', () => app.quit())
