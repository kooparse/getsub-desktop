import path from 'path'
import {app, BrowserWindow} from 'electron'

const appPath = process.env.NODE_ENV === 'development'
  ? `${path.resolve(__dirname, '..')}/renderer/index.html`
  : `${__dirname}/index.html`

export let mainWindow
export const init = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 450,
    minHeight: 450,
    fullscreenable: false,
    title: 'Getsub'
  })
  mainWindow.on('close', () => mainWindow.webContents.send('setInitialState'))
  /* Timeout to be sure the current state is stored */
  mainWindow.on('closed', () => setTimeout(() => mainWindow = null, 150))
  mainWindow.loadURL(`file://${appPath}`)
}
