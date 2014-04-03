humanizing = require('../humanize-duration')
require('chai').should()

describe 'Portuguese humanization of duration', ->

  beforeEach ->
    humanizing.language = 'en'

  it 'humanizes 0ms', ->
    humanizing(0).should.equal '0'

  it 'humanizes Portuguese when passed as an argument', ->
    humanizing((1).second(), 'pt').should.equal '1 segundo'
    humanizing((2).seconds(), 'pt').should.equal '2 segundos'
    humanizing((5).years(), 'pt').should.equal '5 anos'

  it 'humanizes Portuguese when the default language is changed', ->
    humanizing.language = 'pt'
    humanizing((1).second()).should.equal '1 segundo'
    humanizing((2).seconds()).should.equal '2 segundos'
    humanizing((5).years()).should.equal '5 anos'
