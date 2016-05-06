import {flow} from 'utils/async'
import {
  SEARCH_SUBTITLES,
  DOWNLOAD_SUBTITLE
} from 'actions/subtitle'


const defaultState = {
  list: [],
  cursor: {},
  isSearching: false,
  isDownloading: false
}


export default function (state = defaultState, action) {
  switch (action.type) {
    case flow(SEARCH_SUBTITLES, 'REQUEST'):
      return {...state, isSearching: true}

    case flow(SEARCH_SUBTITLES, 'FAILURE'):
      return {...state, isSearching: false}

    case flow(DOWNLOAD_SUBTITLE, 'SUCCESS'):
      const list = state.list.map((arr) => {
        const subtitles = arr.subtitles.map((subtitle) => {
          return subtitle.IDSubtitleFile === action.result.id
            ? {...subtitle, downloaded: true}
            : subtitle
        })
        return {...arr, subtitles}
      })
      return {...state, list}

    case flow(SEARCH_SUBTITLES, 'SUCCESS'):
      return {
        ...state,
        list: [...[action.result], ...state.list],
        cursor: action.result,
        isSearching: false
      }

    default:
      return state
  }
}
