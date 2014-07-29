humanize = require '..'
require('chai').should()
sinon = require 'sinon'
assert = require 'assert'

describe 'deprecated behavior', ->

  it 'does nothing when changing the language like before', ->
    humanize(1000).should.equal '1 second'
    humanize.language = 'es'
    humanize(1000).should.equal '1 second'
    delete humanize.language

  it 'errors when 2nd argument is a string', ->
    (->
      humanize(1000, 'en')
      humanize(1000, 'es')
    ).should.throw Error

  it 'removes old methods', ->
    assert.equal(humanize.componentsOf, undefined)
    assert.equal(humanize.addLanguage, undefined)
    assert.equal(humanize.defaults, undefined)
    assert.equal(humanize.language, undefined)
