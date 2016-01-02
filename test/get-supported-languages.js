var getSupportedLanguages = require('..').getSupportedLanguages
var assert = require('assert')
var fs = require('fs')
var path = require('path')

describe('getSupportedLanguages', function () {
  it('lists all supported languages', function (done) {
    var definitionsPath = path.resolve(__dirname, 'definitions')

    fs.readdir(definitionsPath, function (err, files) {
      if (err) { throw err }

      var languages = files.reduce(function (result, file) {
        if (path.extname(file) === '.csv') {
          return result.concat(path.basename(file, '.csv'))
        } else {
          return result
        }
      }, [])

      assert.deepEqual(languages.sort(), getSupportedLanguages().sort())

      done()
    })
  })
})
