import style from './style.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as subtitleActionCreators from 'actions/subtitle'
import * as panelActionCreators from 'actions/settings'

import DraggingZone from 'components/dragging-zone'
import Panel from 'components/panel'

@connect((state) => ({
  subtitles: state.subtitle,
  isPanelOpen: state.settings.isPanelOpen,
  lang: state.settings.lang
}))
@CSSModules(style)
export default class Home extends React.Component {

  render () {
    let subtitleActions =
      bindActionCreators(subtitleActionCreators, this.props.dispatch)
    let panelActions =
      bindActionCreators(panelActionCreators, this.props.dispatch)

    return (
      <div styleName="container">
        <DraggingZone
          searchSubtitles={subtitleActions.searchSubtitles}
          isOpen={this.props.isPanelOpen}
          togglePanel={panelActions.togglePanel}
          isSearching={this.props.subtitles.isSearching}
          isDownloading={this.props.subtitles.isDownloading}
          lang={this.props.lang}/>
        <Panel
          isOpen={this.props.isPanelOpen}
          list={this.props.subtitles.list}
          cursor={this.props.subtitles.cursor}
          isSearching={this.props.subtitles.isSearching}
          isDownloading={this.props.subtitles.isDownloading}
          downloadSubtitle={subtitleActions.downloadSubtitle}/>
      </div>
    )
  }

}
