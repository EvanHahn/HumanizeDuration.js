humanizeDuration = require '..'
require('chai').should()

describe 'error handling', ->

  it 'throws an error when passed a bad language in the function', ->
    humanizingWith = (options) ->
      return -> humanizeDuration(10000, options)
    humanizingWith({ language: 'bad language' }).should.throw Error
    humanizingWith({ language: '' }).should.throw Error
    humanizingWith({ language: null }).should.throw Error

  it 'throws an error when passed a bad language in a humanizer', ->
    h = humanizeDuration.humanizer({ language: 'bad language' })
    humanizing = (options) ->
      return -> h(10000, options)
    humanizing().should.throw Error
    humanizing({ language: 'bad language' }).should.throw Error
    humanizing({ language: '' }).should.throw Error
    humanizing({ language: null }).should.throw Error
    humanizing({ language: 'es' }).should.not.throw Error
