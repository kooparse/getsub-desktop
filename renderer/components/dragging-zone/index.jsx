import style from './style.css'
import {hashHistory} from 'react-router'
import Dropzone from 'react-dropzone'
import Toggle from 'components/toggle'


@CSSModules(style)
export default class DraggingZone extends React.Component {

  constructor () {
    super()
    this.state = {highlights: false}
  }

  _removeHighlights = () =>
    this.setState({highlights: false})

  onOpenClick = () =>
    this.refs.dropzone.open()

  settings = () =>
    hashHistory.push('/settings')

  onDrop = (files) => {
    this._removeHighlights()
    this.props.searchSubtitles(files)
  }

  onDragEnter = () =>
    this.setState({highlights: true})

  onDragLeave = () =>
    this._removeHighlights()

  render () {
    let dashed = this.state.highlights ? 'dashed-highlighted' : 'dashed'

    return (
      <div styleName={dashed}>
        <Dropzone
          ref="dropzone"
          styleName="drop"
          disableClick={true}
          multiple={false}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragStop={this.onDragStop}>
          <Toggle
            togglePanel={this.props.togglePanel}
            isOpen={this.props.isOpen}/>
          <div styleName="inner-dropzone">
            <i className="icon-upload" styleName="icon"></i>
            <span styleName="text">Drag &amp; drop your file here!</span>
            <button styleName="trigger" onClick={this.onOpenClick}>
              Select File
            </button>
          </div>
          <div onClick={this.settings} styleName="settings">
            {`[ ${window.GETSUB.LANGUAGES[this.props.lang]} ]`}
          </div>
        </Dropzone>
      </div>
    )
  }

}


DraggingZone.propTypes = {
  searchSubtitles: React.PropTypes.func.isRequired,
  togglePanel: React.PropTypes.func.isRequired,
  isSearching: React.PropTypes.bool.isRequired,
  isDownloading: React.PropTypes.bool.isRequired,
  lang: React.PropTypes.string.isRequired
}
