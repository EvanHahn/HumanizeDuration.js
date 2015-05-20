humanizing = require '..'
humanizer = humanizing.humanizer
assert = require 'assert'
ms = require 'ms'

describe 'base humanization function', ->

  it 'humanizes English by default', ->
    assert.equal humanizing(8000), '8 seconds'

  it 'allows you to change some options', ->
    result = humanizing 8000,
      language: 'es'
      spacer: '!'
    assert.equal result, '8!segundos'
