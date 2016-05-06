import * as ipc from 'utils/downloader'
import {asyncRequest, asyncSuccess, asyncFailure} from 'utils/async'
import * as api from 'utils/opensubtitle-api'
import path from 'path'

const SEARCH_SUBTITLES = 'SEARCH_SUBTITLES'
const DOWNLOAD_SUBTITLE = 'DOWNLOAD_SUBTITLE'

const searchSubtitles = (files) => {
  return async function (dispatch, getState) {
    dispatch(asyncRequest(SEARCH_SUBTITLES))
    try {
      const file = files[0]
      const lang = getState().settings.lang
      const computedHash = await api.computeHash(file.path)
      const movieHash = await api.checkMovieHash([computedHash])
      const token = await api.login()

      const subtitles = await api.searchSubtitles(token,
        [{sublanguageid: lang, query: file.name}])

      const obj = {
        subtitles,
        filePath: file.path,
        originName: file.name,
        originLang: lang
      }

      dispatch(asyncSuccess(SEARCH_SUBTITLES, obj))
    }
    catch (err) {
      dispatch(asyncFailure(SEARCH_SUBTITLES, err))
    }
  }
}

const downloadSubtitle = (subtitle) => {
  return async function (dispatch, getState) {
    try {
      if (!subtitle.SubDownloadLink) throw 'No Download Link'
      dispatch(asyncRequest(DOWNLOAD_SUBTITLE))

      let savingPath = getState().settings.path || subtitle.filePath
      savingPath = `${path.dirname(savingPath)}/${subtitle.SubFileName}`

      const url = subtitle.SubDownloadLink.substring(0, subtitle.SubDownloadLink.length - 3)

      await ipc.downloadSubtitle(url, savingPath)
      dispatch(asyncSuccess(DOWNLOAD_SUBTITLE, {id: subtitle.IDSubtitleFile}))
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
