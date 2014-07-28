humanizing = require '..'
require('chai').should()

describe 'Spanish humanization of duration', ->

  beforeEach ->
    humanizing.defaults.language = 'es'

  it 'humanizes 0ms', ->
    humanizing(0).should.equal '0'

  it 'humanizes 1ms, 1s, 1m, 1h, 1d, 1w, 1mo, and 1y', ->
    humanizing(1.millisecond()).should.equal '1 milisegundo'
    humanizing(1.second()).should.equal '1 segundo'
    humanizing(1.minute()).should.equal '1 minuto'
    humanizing(1.hour()).should.equal '1 hora'
    humanizing(1.day()).should.equal '1 día'
    humanizing(1.week()).should.equal '1 semana'
    humanizing(1.month()).should.equal '1 mes'
    humanizing(1.year()).should.equal '1 año'

  it 'humanizes 2ms, 2s, 2m, 2h, 2d, 2w, 2mo, and 2y', ->
    humanizing(2.milliseconds()).should.equal '2 milisegundos'
    humanizing(2.seconds()).should.equal '2 segundos'
    humanizing(2.minutes()).should.equal '2 minutos'
    humanizing(2.hours()).should.equal '2 horas'
    humanizing(2.days()).should.equal '2 días'
    humanizing(2.weeks()).should.equal '2 semanas'
    humanizing(2.months()).should.equal '2 meses'
    humanizing(2.years()).should.equal '2 años'
