import path from 'path'
import {app, BrowserWindow} from 'electron'

const appPath = process.env.NODE_ENV === 'production'
  ? `${__dirname}/index.html`
  : `${path.resolve(__dirname, '..')}/renderer/index.html`

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
  mainWindow.on('closed', () => mainWindow = null)
  mainWindow.loadURL(`file://${appPath}`)
}
