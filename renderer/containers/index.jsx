import style from './style.css'

@CSSModules(style)
export default class Base extends React.Component {

  render () {
    return (
      <div styleName="app">
        {this.props.children}
      </div>
    )
  }

}
