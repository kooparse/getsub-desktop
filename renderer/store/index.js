import productionStore from './store.prod'
import developmentStore from './store.dev'

export default process.env.NODE_ENV === 'production'
  ? productionStore
  : developmentStore
