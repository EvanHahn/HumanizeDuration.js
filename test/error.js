var humanizeDuration = require('..')
var assert = require('assert')

describe('error handling', function () {
  it('throws an error when passed a bad language in the function', function () {
    function humanizingWith (options) {
      return function () {
        humanizeDuration(10000, options)
      }
    }

    assert.throws(humanizingWith({ language: 'EN' }), Error)
    assert.throws(humanizingWith({ language: 'bad language' }), Error)
    assert.throws(humanizingWith({ language: '' }), Error)
    assert.throws(humanizingWith({ language: null }), Error)
  })

  it('throws an error when passed a bad language in a humanizer', function () {
    var h = humanizeDuration.humanizer({
      language: 'bad language'
    })

    function humanizing (options) {
      return function () {
        h(10000, options)
      }
    }

    assert.throws(humanizing(), Error)
    assert.throws(humanizing({ language: 'EN' }), Error)
    assert.throws(humanizing({ language: 'bad language' }), Error)
    assert.throws(humanizing({ language: '' }), Error)
    assert.throws(humanizing({ language: null }), Error)
    assert.doesNotThrow(humanizing({ language: 'es' }), Error)
  })
})
