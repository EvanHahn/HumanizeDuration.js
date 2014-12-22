humanize = require '..'
assert = require 'assert'

describe 'deprecated behavior', ->

  it 'does nothing when changing the language like before', ->
    assert.equal(humanize(1000), '1 second')
    humanize.language = 'es'
    assert.equal(humanize(1000), '1 second')
    delete humanize.language

  it 'does nothing when setting the language as a string', ->
    assert.equal(humanize(1000, 'en'), '1 second')
    assert.equal(humanize(1000, 'es'), '1 second')
    assert.equal(humanize(1000, 'pt'), '1 second')
    assert.equal(humanize(1000, 'garbage'), '1 second')

  it 'removes old methods', ->
    assert.equal(humanize.componentsOf, undefined)
    assert.equal(humanize.addLanguage, undefined)
    assert.equal(humanize.defaults, undefined)
    assert.equal(humanize.language, undefined)
