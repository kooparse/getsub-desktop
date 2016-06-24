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
            If any questions: <strong>getsub@kooparse.com</strong><br/>
            Copyright © 2016 Alexandre Chêne (MIT)
          </p>
        </div>
      </section>
    )
  }

}
