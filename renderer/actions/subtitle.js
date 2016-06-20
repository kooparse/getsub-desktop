import * as ipc from 'utils/downloader'
import {asyncRequest, asyncSuccess, asyncFailure} from 'utils/async'
import * as getsub from 'utils/getsub/'


const SEARCH_SUBTITLES = 'SEARCH_SUBTITLES'
const DOWNLOAD_SUBTITLE = 'DOWNLOAD_SUBTITLE'

const searchSubtitles = (files) => {
  return async function (dispatch, getState) {
    dispatch(asyncRequest(SEARCH_SUBTITLES))
    try {
      const file = files[0]
      const lang = getState().settings.lang
      const subtitle = await getsub.search(file, lang)

      dispatch(asyncSuccess(SEARCH_SUBTITLES, subtitle))

      /**
       * If auto mode is true we want to download
       * the more appropriate subtitle
       * (always the first element)
       */
      if (getState().settings.auto) {
        dispatch(downloadSubtitle({
          ...subtitle.subtitles[0],
          filePath: subtitle.filePath,
          originName: subtitle.originName
        }))
      }
    }
    catch (err) {
      dispatch(asyncFailure(SEARCH_SUBTITLES, err))
    }
  }
}

const downloadSubtitle = (subtitle) => {
  return async function (dispatch, getState) {
    try {
      dispatch(asyncRequest(DOWNLOAD_SUBTITLE))

      const {id, downloadLink} = subtitle
      const savingPath = getState().settings.path || subtitle.filePath

      await ipc.downloadSubtitle(subtitle, savingPath)
      dispatch(asyncSuccess(DOWNLOAD_SUBTITLE, {id}))
    }
    catch (err) {
      dispatch(asyncFailure(DOWNLOAD_SUBTITLE, err))
    }
  }
}

export {
  SEARCH_SUBTITLES,
  DOWNLOAD_SUBTITLE,
  downloadSubtitle,
  searchSubtitles
}
