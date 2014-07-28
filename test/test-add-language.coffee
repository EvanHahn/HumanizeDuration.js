humanizing = require '..'
require('chai').should()

describe 'adding a new language', ->

  helper = (n) -> if n is 1 then 'y' else 'Y'
  humanizing.addLanguage 'new language',
    year: (n) -> helper(n)
    month: (n) -> if n is 1 then 'mo' else 'MO'
    week: (n) -> if n is 1 then 'w' else 'W'
    day: (n) -> if n is 1 then 'd' else 'D'
    hour: (n) -> if n is 1 then 'h' else 'H'
    minute: (n) -> if n is 1 then 'm' else 'M'
    second: (n) -> if n is 1 then 's' else 'S'
    millisecond: (n) -> if n is 1 then 'ms' else 'MS'

  beforeEach ->
    humanizing.language = 'new language'

  it 'humanizes 0ms', ->
    humanizing(0).should.equal '0'

  it 'humanizes 1ms, 1s, 1m, 1h, 1d, 1w, 1mo, and 1y', ->
    humanizing(1.millisecond()).should.equal '1 ms'
    humanizing(1.second()).should.equal '1 s'
    humanizing(1.minute()).should.equal '1 m'
    humanizing(1.hour()).should.equal '1 h'
    humanizing(1.day()).should.equal '1 d'
    humanizing(1.week()).should.equal '1 w'
    humanizing(1.month()).should.equal '1 mo'
    humanizing(1.year()).should.equal '1 y'

  it 'humanizes 2ms, 2s, 2m, 2h, 2d, 2w, 2mo, and 2y', ->
    humanizing(2.milliseconds()).should.equal '2 MS'
    humanizing(2.seconds()).should.equal '2 S'
    humanizing(2.minutes()).should.equal '2 M'
    humanizing(2.hours()).should.equal '2 H'
    humanizing(2.days()).should.equal '2 D'
    humanizing(2.weeks()).should.equal '2 W'
    humanizing(2.months()).should.equal '2 MO'
    humanizing(2.years()).should.equal '2 Y'

  it 'keeps old languages intact', ->
    humanizing(2.minutes(), 'en').should.equal '2 minutes'
    humanizing(2.minutes(), 'es').should.equal '2 minutos'
    humanizing.language = 'ko'
    humanizing(2.days()).should.equal '2 일'
    humanizing(2.days(), 'new language').should.equal '2 D'

  it 'throws an error when overwriting a language', ->
    addingANewLanguage = ->
      response = -> 'foo'
      humanizing.addLanguage 'en',
        year: response
        month: response
        week: response
        day: response
        hour: response
        minute: response
        second: response
        millisecond: response
    addingANewLanguage.should.throw Error
