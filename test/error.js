const humanizeDuration = require('..')
const assert = require('assert')

describe('error handling', () => {
  it('throws an error when passed a bad language in the function', () => {
    function humanizingWith (options) {
      return () => {
        humanizeDuration(10000, options)
      }
    }

    assert.throws(humanizingWith({ language: 'EN' }), Error)
    assert.throws(humanizingWith({ language: 'bad language' }), Error)
    assert.throws(humanizingWith({ language: '' }), Error)
    assert.throws(humanizingWith({ language: null }), Error)
    assert.throws(humanizingWith({ language: 'bad language', fallback: null }), Error)
  })

  it('throws an error when passed a bad language in a humanizer', () => {
    const humanizer = humanizeDuration.humanizer({
      language: 'bad language'
    })

    function humanizing (options) {
      return () => {
        humanizer(10000, options)
      }
    }

    assert.throws(humanizing(), Error)
    assert.throws(humanizing({ language: 'EN' }), Error)
    assert.throws(humanizing({ language: 'bad language' }), Error)
    assert.throws(humanizing({ language: '' }), Error)
    assert.throws(humanizing({ language: null }), Error)
    assert.doesNotThrow(humanizing({ language: 'es' }), Error)
    assert.throws(humanizing({ language: ['es', 'en'] }), Error)
  })

  it('should throw if fallbacks configuration is invalid', () => {
    function humanizingWith (options) {
      return () => {
        humanizeDuration(10000, options)
      }
    }
    assert.throws(humanizingWith({ language: 'es', fallbacks: [] }), Error)
    assert.throws(humanizingWith({ language: 'es', fallbacks: undefined }), Error)
    assert.throws(humanizingWith({ language: 'es', fallbacks: null }), Error)
    assert.throws(humanizingWith({ language: 'es', fallbacks: 'en' }), Error)
  })
})
