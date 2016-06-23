import style from './style.css'
import Loader from 'components/loader'

@CSSModules(style)
export default class Panel extends React.Component {

  download = (subtitle, item, event) => {
    event.stopPropagation()
    this.props.downloadSubtitle({
      ...subtitle,
      filePath: item.filePath,
      originName: item.originName
    })
  }

  render () {
    return (
      <div styleName={this.props.isOpen ? 'open' : 'closed'}>
        <div styleName="column">
          <Loader isSearching={this.props.isSearching}/>
          {
            this.props.list.map((item, listIndex) => {
              return (
                <div key={listIndex} styleName="block">
                  {
                    item.subtitles.map((subtitle, itemIndex) => {
                      return (
                        <div
                          styleName={subtitle.downloaded ? 'downloaded' : 'item'}
                          onClick={this.download.bind(this, subtitle, item)}
                          key={itemIndex}>
                          {subtitle.fileName}
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

}

Panel.propTypes = {
  downloadSubtitle: React.PropTypes.func.isRequired,
  cursor: React.PropTypes.object.isRequired,
  isOpen: React.PropTypes.bool.isRequired,
  isSearching: React.PropTypes.bool.isRequired,
  isDownloading: React.PropTypes.bool.isRequired,
  list: React.PropTypes.array.isRequired
}
