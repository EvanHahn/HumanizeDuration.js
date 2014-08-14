humanize = require '..'
require('chai').should()
assert = require 'assert'

describe 'deprecated behavior', ->

  it 'does nothing when changing the language like before', ->
    humanize(1000).should.equal '1 second'
    humanize.language = 'es'
    humanize(1000).should.equal '1 second'
    delete humanize.language

  it 'does nothing when setting the language as a string', ->
    humanize(1000, 'en').should.equal '1 second'
    humanize(1000, 'es').should.equal '1 second'
    humanize(1000, 'pt').should.equal '1 second'
    humanize(1000, 'garbage').should.equal '1 second'

  it 'removes old methods', ->
    assert.equal(humanize.componentsOf, undefined)
    assert.equal(humanize.addLanguage, undefined)
    assert.equal(humanize.defaults, undefined)
    assert.equal(humanize.language, undefined)
