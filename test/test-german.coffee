humanizing = require '../humanize-duration'
require('chai').should()

describe 'German humanization of duration', ->

  beforeEach ->
    humanizing.language = 'en'

  it 'humanizes 0ms', ->
    humanizing(0).should.equal '0'

  it 'humanizes German singulars', ->
    humanizing((1).second(), 'de').should.equal '1 sekunde'
    humanizing((1).minute(), 'de').should.equal '1 minute'
    humanizing((1).hour(), 'de').should.equal '1 stunde'
    humanizing((1).day(), 'de').should.equal '1 tag'
    humanizing((1).weeks(), 'de').should.equal '1 woche'
    humanizing((1).month(), 'de').should.equal '1 monat'
    humanizing((1).year(), 'de').should.equal '1 jahr'

  it 'humanizes German plurals', ->
    humanizing((2).seconds(), 'de').should.equal '2 sekunden'
    humanizing((2).minutes(), 'de').should.equal '2 minuten'
    humanizing((2).hours(), 'de').should.equal '2 stunden'
    humanizing((2).days(), 'de').should.equal '2 tage'
    humanizing((2).weeks(), 'de').should.equal '2 wochen'
    humanizing((2).months(), 'de').should.equal '2 monate'
    humanizing((2).years(), 'de').should.equal '2 jahre'

  it 'humanizes German when passed as an argument', ->
    humanizing((1).second(), 'de').should.equal '1 sekunde'
    humanizing((2).seconds(), 'de').should.equal '2 sekunden'
    humanizing((5).years(), 'de').should.equal '5 jahre'

  it 'humanizes German when the default language is changed', ->
    humanizing.language = 'de'
    humanizing((1).second()).should.equal '1 sekunde'
    humanizing((2).seconds()).should.equal '2 sekunden'
    humanizing((5).years()).should.equal '5 jahre'
