humanizing = require '..'
require('chai').should()

describe 'French humanization of duration', ->

  beforeEach ->
    humanizing.defaults.language = 'fr'

  it 'humanizes 0ms', ->
    humanizing(0).should.equal '0'

  it 'humanizes 1ms, 1s, 1m, 1h, 1d, 1w, 1mo, and 1y', ->
    humanizing(1.millisecond()).should.equal '1 milliseconde'
    humanizing(1.second()).should.equal '1 seconde'
    humanizing(1.minute()).should.equal '1 minute'
    humanizing(1.hour()).should.equal '1 heure'
    humanizing(1.day()).should.equal '1 jour'
    humanizing(1.week()).should.equal '1 semaine'
    humanizing(1.month()).should.equal '1 mois'
    humanizing(1.year()).should.equal '1 an'

  it 'humanizes 2ms, 2s, 2m, 2h, 2d, 2w, 2mo, and 2y', ->
    humanizing(2.milliseconds()).should.equal '2 millisecondes'
    humanizing(2.seconds()).should.equal '2 secondes'
    humanizing(2.minutes()).should.equal '2 minutes'
    humanizing(2.hours()).should.equal '2 heures'
    humanizing(2.days()).should.equal '2 jours'
    humanizing(2.weeks()).should.equal '2 semaines'
    humanizing(2.months()).should.equal '2 mois'
    humanizing(2.years()).should.equal '2 ans'
