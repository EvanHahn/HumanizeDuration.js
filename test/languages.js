var humanizeDuration = require('..')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var parseCSV = require('csv-parse')

function options (language) {
  return {
    language: language,
    delimiter: '+',
    units: ['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms']
  }
}

describe('localized humanization', function () {
  var definitionsPath = path.resolve(__dirname, 'definitions')
  var files = fs.readdirSync(definitionsPath)
  var languages = files.reduce(function (result, file) {
    if (path.extname(file) === '.csv') {
      result = result.concat(path.basename(file, '.csv'))
    }
    return result
  }, [])

  languages.forEach(function (language) {
    describe('for ' + language, function () {
      before(function (done) {
        var self = this
        var file = path.resolve(definitionsPath, language + '.csv')
        fs.readFile(file, { encoding: 'utf8' }, function (err, data) {
          if (err) { return done(err) }

          parseCSV(data, { delimiter: '$' }, function (err, rows) {
            if (err) { return done(err) }

            self.pairs = rows.map(function (r) {
              return [parseFloat(r[0]), r[1]]
            })
            done()
          })
        })
      })

      it('humanizes with arguments', function () {
        this.pairs.forEach(function (pair) {
          var result = humanizeDuration(pair[0], options(language))
          assert.equal(result, pair[1])
        })
      })

      it('humanizes with a humanizer', function () {
        var h = humanizeDuration.humanizer(options(language))

        this.pairs.forEach(function (pair) {
          var result = h(pair[0])
          assert.equal(result, pair[1])
        })
      })
    })
  })
})
