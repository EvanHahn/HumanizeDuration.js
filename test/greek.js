var humanizeDuration = require('..')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var parseCSV = require('csv-parse')

describe('legacy Greek support', function () {
  // See https://github.com/EvanHahn/HumanizeDuration.js/issues/143
  // for more here.

  it('aliases "gr" to "el"', function (done) {
    var greekPath = path.resolve(__dirname, 'definitions', 'el.csv')

    fs.readFile(greekPath, { encoding: 'utf8' }, function (err, data) {
      if (err) { return done(err) }

      parseCSV(data, { delimiter: '$' }, function (err, rows) {
        if (err) { return done(err) }

        rows.forEach(function (row) {
          var ms = parseFloat(row[0])

          var humanizedGr = humanizeDuration(ms, { language: 'gr' })
          var humanizedEl = humanizeDuration(ms, { language: 'el' })
          assert.strictEqual(humanizedGr, humanizedEl)
        })

        done()
      })
    })
  })

  it('does not include "gr" in getSupportedLanguages', function () {
    var supportedLanguages = humanizeDuration.getSupportedLanguages()
    assert.strictEqual(supportedLanguages.indexOf('gr'), -1)
  })
})
