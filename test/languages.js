const humanizeDuration = require('..')
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const parseCSV = require('csv-parse')

function options (language) {
  return {
    language,
    delimiter: '+',
    units: ['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms']
  }
}

describe('localized humanization', () => {
  const definitionsPath = path.resolve(__dirname, 'definitions')
  const files = fs.readdirSync(definitionsPath)
  const languages = files.reduce((result, file) => {
    if (path.extname(file) === '.csv') {
      return result.concat(path.basename(file, '.csv'))
    }
    return result
  }, [])

  languages.forEach(language => {
    describe('for ' + language, () => {
      before(function (done) {
        const self = this
        const filePath = path.resolve(definitionsPath, language + '.csv')
        fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
          if (err) { return done(err) }

          parseCSV(data, { delimiter: '$' }, (err, rows) => {
            if (err) { return done(err) }

            self.pairs = rows.map(row => [parseFloat(row[0]), row[1]])
            done()
          })
        })
      })

      it('humanizes with arguments', function () {
        this.pairs.forEach(pair => {
          const result = humanizeDuration(pair[0], options(language))
          assert.equal(result, pair[1])
        })
      })

      it('humanizes with a humanizer', function () {
        const h = humanizeDuration.humanizer(options(language))

        this.pairs.forEach(pair => {
          const result = h(pair[0])
          assert.equal(result, pair[1])
        })
      })
    })
  })
})
