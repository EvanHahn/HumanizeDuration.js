humanize = require '..'
require('chai').should()
sinon = require 'sinon'

describe 'deprecated behavior', ->

  beforeEach ->
    sinon.spy(console, 'warn')
    humanize.defaults.language = 'en'
    delete humanize.language

  afterEach ->
    console.warn.restore()
    delete humanize.language

  it 'can change the default language but warns you', ->
    humanize(1000).should.equal '1 second'
    console.warn.called.should.equal false
    humanize.language = 'es'
    humanize(1000).should.equal '1 segundo'
    console.warn.called.should.equal true

  it 'warns you when setting the language as the 2nd argument', ->
    humanize(1000, { language: 'es' }).should.equal '1 segundo'
    console.warn.called.should.equal false
    humanize(1000, 'es').should.equal '1 segundo'
    console.warn.called.should.equal true

  it 'warns you when using componentsOf', ->
    humanize.componentsOf(1000)
    console.warn.called.should.equal true
