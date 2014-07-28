humanizeDuration = require '..'
require('chai').should()

describe 'bad humanization of duration', ->

  it 'throws an error when passed a bad language', ->
    humanizingWith = (language) ->
      return -> humanizeDuration(69, language)
    humanizingWith('bad language').should.throw Error
    humanizingWith(420).should.throw Error
    humanizingWith({}).should.throw Error
    humanizingWith([]).should.throw Error

  it 'throws errors when humanizing after a bad default language', ->
    humanizing = -> humanizeDuration(69)
    humanizeDuration.defaults.language = 'bad language'
    humanizing.should.throw Error
    humanizeDuration.defaults.language = 420
    humanizing.should.throw Error
    humanizeDuration.defaults.language = {}
    humanizing.should.throw Error
    humanizeDuration.defaults.language = []
    humanizing.should.throw Error
