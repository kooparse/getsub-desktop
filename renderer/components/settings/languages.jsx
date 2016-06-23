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
            Preferred language:
          </label>
          <p styleName="description">
            Your selected language becomes your preferred language.<br/>
            It will remain the same when you come back!
          </p>
          <select onChange={this.change} value={this.props.lang}>
            {
              Object.getOwnPropertyNames(languages).map((key, index) => {
                return (<option value={key} key={index}>{languages[key]}</option>)
              })
            }
          </select>
        </div>
      </section>
    )
  }

}

Languages.PropTypes = {
  selectLanguage: React.PropTypes.func.isRequired,
  lang: React.PropTypes.string.isRequired
}
