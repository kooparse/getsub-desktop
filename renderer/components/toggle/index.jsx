import style from './style.css'

@CSSModules(style)
export default class Toggle extends React.Component {

  toggle = () => this.props.togglePanel()

  render () {
    return (
      <button onClick={this.toggle} styleName="toggle">
        <div styleName={this.props.isOpen ? 'rotate-right' : 'rotate-left'}>
          <i className="icon-circle-left" styleName="cercle"></i>
        </div>
      </button>
    )
  }

}

Toggle.PropTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  togglePanel: React.PropTypes.func.isRequired
}
