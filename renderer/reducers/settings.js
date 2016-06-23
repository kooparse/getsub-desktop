import {flow} from 'utils/async'
import {TOGGLE_PANEL, SELECT_LANGUAGE, SELECT_MODE} from 'actions/settings'
import {SEARCH_SUBTITLES} from 'actions/subtitle'

const defaultState = {
  lang: 'eng',
  auto: false,
  path: null,
  isPanelOpen: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_PANEL:
      return {...state, isPanelOpen: !state.isPanelOpen}

    case SELECT_LANGUAGE:
      return {...state, lang: action.lang}

    case SELECT_MODE:
      return {...state, auto: action.auto}

    case flow(SEARCH_SUBTITLES, 'REQUEST'):
      return {...state, isPanelOpen: true}

    default:
      return state
  }
}
