import style from './style.css'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as settingsActionCreators from 'actions/settings'
import Languages from 'components/settings/languages'
import Modes from 'components/settings/modes'
import About from 'components/settings/about'

@connect((state) => ({
  lang: state.settings.lang,
  auto: state.settings.auto,
}))
@CSSModules(style)
export default class Settings extends React.Component {

  goHome = () =>
    hashHistory.push('/')

  render () {
    let settingsActions =
      bindActionCreators(settingsActionCreators, this.props.dispatch)

    return (
      <div styleName="settings">
        <i className="icon-cancel-circle" styleName="go-back" onClick={this.goHome}/>
        <Languages
          lang={this.props.lang}
          selectLanguage={settingsActions.selectLanguage}/>
        <Modes
          auto={this.props.auto}
          selectMode={settingsActions.selectMode}/>
        <About/>
      </div>

    )
  }

}
