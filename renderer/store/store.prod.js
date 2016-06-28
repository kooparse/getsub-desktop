import {getInitialState} from 'utils/localStorage'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from 'reducers'

export default createStore(reducers, getInitialState(), applyMiddleware(thunk))
