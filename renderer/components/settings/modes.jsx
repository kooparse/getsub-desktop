import style from './style.css'

@CSSModules(style)
export default class Modes extends React.Component {

  change = (event) =>
    this.props.selectMode(event.target.value == 'true' ? true : false)

  render () {
    return (
      <section styleName="section">
        <div styleName="select">
          <label styleName="title">Preferred mode:</label>
          <p styleName="description">
            On Getsub, you have two modes.<br/>
            The auto mode download the more accurate subtitle for you.<br/>
            The manual mode let you choose the subtitle you want to download.
          </p>
          <select onChange={this.change} value={this.props.auto}>
            <option value="true">Auto</option>
            <option value="false">Manual</option>
          </select>
        </div>
      </section>
    )
  }

}


Modes.PropTypes = {
  selectMode: React.PropTypes.func.isRequired,
  auto: React.PropTypes.bool.isRequired
}
