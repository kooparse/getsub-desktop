import style from './style.css'

@CSSModules(style)
export default class Languages extends React.Component {

  change = (event) =>
    this.props.selectLanguage(event.target.value)

  render () {
    let languages = window.GETSUB.LANGUAGES
    return (
      <section styleName="section">
        <div styleName="select">
          <label styleName="title">
            About:
          </label>
          <p styleName="description">
            [TODO...]
          </p>
        </div>
      </section>
    )
  }

}
