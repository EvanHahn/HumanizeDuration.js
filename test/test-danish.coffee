humanizing = require '..'
require('chai').should()

describe 'Danish humanization of duration', ->

  beforeEach ->
    humanizing.language = 'da'

  it 'humanizes 0ms', ->
    humanizing(0).should.equal '0'

  it 'humanizes 1ms, 1s, 1m, 1h, 1d, 1w, 1mo, and 1y', ->
    humanizing(1.millisecond()).should.equal '1 millisekund'
    humanizing(1.second()).should.equal '1 sekund'
    humanizing(1.minute()).should.equal '1 minut'
    humanizing(1.hour()).should.equal '1 time'
    humanizing(1.day()).should.equal '1 dag'
    humanizing(1.week()).should.equal '1 uge'
    humanizing(1.month()).should.equal '1 måned'
    humanizing(1.year()).should.equal '1 år'

  it 'humanizes 2ms, 2s, 2m, 2h, 2d, 2w, 2mo, and 2y', ->
    humanizing(2.milliseconds()).should.equal '2 millisekunder'
    humanizing(2.seconds()).should.equal '2 sekunder'
    humanizing(2.minutes()).should.equal '2 minutter'
    humanizing(2.hours()).should.equal '2 timer'
    humanizing(2.days()).should.equal '2 dage'
    humanizing(2.weeks()).should.equal '2 uger'
    humanizing(2.months()).should.equal '2 måneder'
    humanizing(2.years()).should.equal '2 år'
