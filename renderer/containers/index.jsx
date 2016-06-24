import './style.global.css'

export default class Base extends React.Component {

  render () {
    return (
      <div className="app">
        {this.props.children}
      </div>
    )
  }

}
