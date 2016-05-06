import global from 'utils/global'
import { hashHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import routes from 'routes'
import store from 'store'


window.GETSUB = global

ReactDOM.render(
  <Provider store={store}>
    <Router children={routes} history={hashHistory} />
  </Provider>,
  document.getElementById('getsub-desktop')
)
