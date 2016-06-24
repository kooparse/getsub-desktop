import {ipcRenderer} from 'electron'
import path from 'path'

/**
 * Download subtitle method
 *
 * @param {String} Direct download link
 * @param {String} Optionnal saving path
 */
export const downloadSubtitle = async (subtitle, savingPath) => {
  return await new Promise((resolve, reject) => {
    savingPath = _normalize(subtitle.subtitleName, savingPath)
    ipcRenderer.send('downloadFile', subtitle.downloadLink, savingPath)
    ipcRenderer.on('done', (event, state) => {
      if (state === 'completed') resolve('Download successfully')
      else reject('Download is cancelled or interrupted that can\'t be resumed')
    })
  })
}

/**
 * Path normalizer for Windows and macOS
 *
 * @param {String} Subtitle name
 * @param {String} Saving path
 * @return {String} Normalized path
 */
const _normalize = (subtitleName, savingPath) => {
  return path.normalize(`${path.dirname(savingPath)}/${subtitleName}`)
}
