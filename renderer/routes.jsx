import {ipcRenderer} from 'electron'
import { Route, IndexRoute, hashHistory } from 'react-router'
import Base from 'containers'
import Home from 'containers/home'
import Settings from 'containers/settings'


/**
 * It isn't the best way to do this kind of stuff...
 * But I just need to change the route for now.
 */
ipcRenderer.on('settings', () => hashHistory.push('/settings'))

export default (
  <Route path="/" component={Base}>
    <IndexRoute component={Home}/>
    <Route path="settings" component={Settings}/>
  </Route>
)
