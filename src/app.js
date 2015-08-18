import './normalize.css'
import './skeleton.css'
import './styles.css'

import React from 'react'
import humanizeDuration from 'humanize-duration'
import random from 'random-number'
import hl from './hl'

// Let them play in the console
window.humanizeDuration = humanizeDuration

const shortCodeToLanguageName = {
  ar: 'Arabic',
  ca: 'Catalan',
  zh_CN: 'Chinese, simplified',
  zh_TW: 'Chinese, traditional',
  da: 'Danish',
  nl: 'Dutch',
  en: 'English',
  fr: 'French',
  de: 'German',
  gr: 'Greek',
  hu: 'Hungarian',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  no: 'Norwegian',
  pl: 'Polish',
  pt: 'Portuguese',
  ru: 'Russian',
  es: 'Spanish',
  sv: 'Swedish',
  tr: 'Turkish',
  uk: 'Ukrainian'
}

const Demo = class HumanizeDurationDemo extends React.Component {
  constructor(props) {
    super(props)
    const languages = humanizeDuration.getSupportedLanguages()

    const language = languages[random({ min: 0, max: languages.length - 1, integer: true })]
    const milliseconds = random({ min: 0, max: 10000000, integer: true })
    const duration = this.calculateDuration(language, milliseconds)

    this.state = { language, milliseconds, duration }
  }

  selectLanguage(event) {
    const { value } = event.target
    this.setState({
      language: value,
      duration: this.calculateDuration(value, this.state.milliseconds)
    })
  }

  setMilliseconds(event) {
    const { value } = event.target
    this.setState({
      milliseconds: value,
      duration: this.calculateDuration(this.state.language, value)
    })
  }

  calculateDuration(language, milliseconds) {
    if (language && milliseconds !== null) {
      return humanizeDuration(milliseconds, { language })
    }
  }

  render() {
    return (
      <div>
        <h2>Demo</h2>
        <div className="row">
          <div className="four columns">
            <label htmlFor="milliseconds-input">Milliseconds</label>
            <input type="number"
                   id="milliseconds-input"
                   value={this.state.milliseconds}
                   onChange={this.setMilliseconds.bind(this)} />
          </div>

          <div className="four columns">
            <label htmlFor="language-input">Language</label>
            <select required
                    id="language-input"
                    value={this.state.language}
                    onChange={this.selectLanguage.bind(this)}>
              <option value="">Select a Language</option>
              {humanizeDuration.getSupportedLanguages().map((code, i) => {
                return <option value={code} key={i}>{shortCodeToLanguageName[code] || code}</option>
              })}
            </select>
          </div>
          <div className="four columns">
            <label htmlFor="result-input">Result</label>
            <input id="result-input" type="text" value={this.state.duration} readOnly />
          </div>
        </div>
      </div>
    )
  }
}

React.render(
  <Demo />,
  document.getElementById('demo')
)
