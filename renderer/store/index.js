import {setInitialState} from 'utils/localStorage'
import {ipcRenderer} from 'electron'
import developmentStore from './store.dev'
import productionStore from './store.prod'

const store = process.env.NODE_ENV === 'development'
  ? developmentStore
  : productionStore

ipcRenderer.on('setInitialState', () => {
  setInitialState(store.getState())
})

export default store
