import {flow} from 'utils/async'
import {SEARCH_SUBTITLES, DOWNLOAD_SUBTITLE} from 'actions/subtitle'

const defaultState = {
  list: [],
  cursor: {},
  isSearching: false
}

const mutateList = (list, id, changes) => {
  return list.map((arr) => {
    const subtitles = arr.subtitles.map((subtitle) => {
      return subtitle.id === id ? {...subtitle, ...changes} : subtitle
    })
    return {...arr, subtitles}
  })
}

export default function (state = defaultState, action) {

  var list

  switch (action.type) {
    case flow(SEARCH_SUBTITLES, 'REQUEST'):
      return {...state, isSearching: true}

    case flow(DOWNLOAD_SUBTITLE, 'REQUEST'):
      list = mutateList(state.list, action.params.id, {isDownloading: true})
      return {...state, list}

    case flow(SEARCH_SUBTITLES, 'FAILURE'):
      return {...state, isSearching: false}

    case flow(DOWNLOAD_SUBTITLE, 'FAILURE'):
      list = mutateList(state.list, action.result.id, {isDownloading: false})
      return {...state, list}

    case flow(DOWNLOAD_SUBTITLE, 'SUCCESS'):
      list = mutateList(state.list, action.result.id, {
        downloaded: true,
        isDownloading: false
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
