humanize = require '..'
require('chai').should()
sinon = require 'sinon'

describe 'deprecated behavior', ->

  beforeEach ->
    sinon.spy(console, 'warn')

  afterEach ->
    console.warn.restore()

  describe 'setting default language', ->

    beforeEach ->
      humanize.defaults.language = 'en'
      delete humanize.language

    afterEach ->
      delete humanize.language

    it 'can change the default language but warn you', ->
      humanize(1000).should.equal '1 second'
      console.warn.called.should.equal false
      humanize.language = 'es'
      humanize(1000).should.equal '1 segundo'
      console.warn.called.should.equal true
