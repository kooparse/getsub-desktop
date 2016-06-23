import style from './style.css'

@CSSModules(style)
export default class Loader extends React.Component {

  render () {
    let loaderClass = this.props.isSearching ? 'loader' : 'loader-hidden'
    return (<div id="loader" styleName={loaderClass}></div>)
  }

}

Loader.PropTypes = {
  isSearching: React.PropTypes.bool.isRequired
}
