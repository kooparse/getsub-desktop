import {getInitialState} from 'utils/localStorage'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from 'reducers'
import createLogger from 'redux-logger'

const logger = createLogger()

export default createStore(reducers, getInitialState(), applyMiddleware(thunk, logger))
