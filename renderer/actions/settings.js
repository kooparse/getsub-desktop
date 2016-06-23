const TOGGLE_PANEL = 'TOGGLE_PANEL'
const SELECT_LANGUAGE = 'SELECT_LANGUAGE'
const SELECT_MODE = 'SELECT_MODE'

const togglePanel = () => {
  return {type: TOGGLE_PANEL}
}

const selectLanguage = (lang) => {
  return {
    type: SELECT_LANGUAGE,
    lang
  }
}

const selectMode = (auto) => {
  return {
    type: SELECT_MODE,
    auto
  }
}

export {
  TOGGLE_PANEL,
  SELECT_LANGUAGE,
  SELECT_MODE,
  selectLanguage,
  selectMode,
  togglePanel
}
