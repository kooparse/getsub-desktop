import { Route, IndexRoute } from 'react-router'
import Base from 'containers'
import Home from 'containers/home'
import Settings from 'containers/settings'

export default (
  <Route path="/" component={Base}>
    <IndexRoute component={Home}/>
    <Route path="settings" component={Settings}/>
  </Route>
)
