humanizeDuration = require '..'
assert = require 'assert'

describe 'error handling', ->

  it 'throws an error when passed a bad language in the function', ->
    humanizingWith = (options) ->
      return -> humanizeDuration(10000, options)
    assert.throws humanizingWith(language: 'bad language'), Error
    assert.throws humanizingWith(language: ''), Error
    assert.throws humanizingWith(language: null), Error

  it 'throws an error when passed a bad language in a humanizer', ->
    h = humanizeDuration.humanizer({ language: 'bad language' })
    humanizing = (options) ->
      return -> h(10000, options)
    assert.throws humanizing(), Error
    assert.throws humanizing(language: 'bad language'), Error
    assert.throws humanizing(language: ''), Error
    assert.throws humanizing(language: null), Error
    assert.doesNotThrow humanizing(language: 'es'), Error
