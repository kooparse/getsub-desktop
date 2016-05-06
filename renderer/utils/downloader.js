import {ipcRenderer} from 'electron'


/**
 * Download subtitle method
 *
 * @param {String} Direct download link
 * @param {String} Optionnal saving path
 */
const downloadSubtitle = async (url, savingPath = '') => {
  return await new Promise((resolve, reject) => {
    ipcRenderer.send('downloadFile', url, savingPath)
    ipcRenderer.on('done', (event, state) => {
      if (state === 'completed') resolve('Download successfully')
      else reject('Download is cancelled or interrupted that can\'t be resumed')
    })
  })
}


export {
  downloadSubtitle
}
