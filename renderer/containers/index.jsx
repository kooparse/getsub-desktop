import './style.global.css'


export default class Base extends React.Component {

  render () {
    return (
      <div styleName="app">
        {this.props.children}
      </div>
    )
  }

}
