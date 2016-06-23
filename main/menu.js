import {app, Menu} from 'electron'
import {mainWindow} from './windows'

const getTemplate = () => {
  let template = []

  if (process.platform === 'darwin') {
    template = [{
      label: 'Getsub',
      submenu: [
        {
          label: 'Preferences...',
          accelerator: 'Cmd+,',
          click: () => mainWindow.webContents.send('settings')
        },
        {type: 'separator'},
        {
          label: 'Hide Getsub',
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {type: 'separator'},
        {
          label: 'Close',
          click: () => app.quit()
        }
      ]
    }]
  }

  return template
}

export const init = () => {
  let menu = Menu.buildFromTemplate(getTemplate())
  Menu.setApplicationMenu(menu)
}
