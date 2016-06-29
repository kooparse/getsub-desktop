import style from './style.css'
import Loader from 'components/loader'

@CSSModules(style)
export default class Panel extends React.Component {

  download = (subtitle, item, event) => {
    event.stopPropagation()
    if (!subtitle.downloaded) {
      this.props.downloadSubtitle({
        ...subtitle,
        filePath: item.filePath,
        originName: item.originName
      })
    }
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
                      let loaderClass = subtitle.isDownloading
                        ? 'loader'
                        : 'loader-hidden'

                      let itemClass = subtitle.downloaded
                        ? 'downloaded'
                        : 'item'

                      itemClass = subtitle.isDownloading
                        ? 'downloading'
                        : itemClass

                      return (
                        <div
                          styleName={itemClass}
                          onClick={this.download.bind(this, subtitle, item)}
                          key={itemIndex}>
                          <div styleName="title">{subtitle.fileName}</div>
                          <div styleName={loaderClass}/>
                          <i className="icon-check-alt" styleName="checkmark"/>
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
  list: React.PropTypes.array.isRequired
}
