var getSupportedLanguages = require('..').getSupportedLanguages
var assert = require('assert')
var fs = require('fs')
var path = require('path')

describe('getSupportedLanguages', function () {
  it('lists all supported languages', function (done) {
    var definitionsPath = path.resolve(__dirname, 'definitions')

    fs.readdir(definitionsPath, function (err, files) {
      if (err) { throw err }

      var languages = files.filter(function (file) {
        return path.extname(file) === '.csv'
      }).map(function (file) {
        return path.basename(file, '.csv')
      })

      assert.deepEqual(languages.sort(), getSupportedLanguages().sort())

      done()
    })
  })

  it('returns a different array each time', function () {
    assert.notEqual(getSupportedLanguages(), getSupportedLanguages())
  })
})
