const {getSupportedLanguages} = require('..')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

describe('getSupportedLanguages', () => {
  it('lists all supported languages', done => {
    const definitionsPath = path.resolve(__dirname, 'definitions')

    fs.readdir(definitionsPath, (err, files) => {
      if (err) { return done(err) }

      const languages = files
        .filter(file => path.extname(file) === '.csv')
        .map(file => path.basename(file, '.csv'))

      assert.deepEqual(languages.sort(), getSupportedLanguages().sort())

      done()
    })
  })

  it('returns a different array each time', function () {
    assert.notEqual(getSupportedLanguages(), getSupportedLanguages())
  })
})
