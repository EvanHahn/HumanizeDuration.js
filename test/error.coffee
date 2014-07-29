humanizeDuration = require '..'
require('chai').should()

describe 'error handling', ->

  it 'throws an error when passed a bad language', ->
    humanizingWith = (language) ->
      return -> humanizeDuration(69, language)
    humanizingWith({ language: 'bad language' }).should.throw Error
