humanizing = require '..'
require('chai').should()

describe 'Portuguese humanization of duration', ->

  beforeEach ->
    humanizing.defaults.language = 'pt'

  it 'humanizes 0ms', ->
    humanizing(0).should.equal '0'

  it 'humanizes 1ms', ->
    humanizing(1).should.equal '1 milissegundo'

  it 'humanizes multiple milliseconds', ->
    humanizing(2).should.equal '2 milissegundos'
    humanizing(5).should.equal '5 milissegundos'
    humanizing(12).should.equal '12 milissegundos'
    humanizing(420).should.equal '420 milissegundos'

  it 'humanizes half-second intervals', ->
    humanizing((0.5).seconds()).should.equal '0.5 segundos'
    humanizing((1.0).seconds()).should.equal '1 segundo'
    humanizing((1.5).seconds()).should.equal '1.5 segundos'
    humanizing((2.0).seconds()).should.equal '2 segundos'
    humanizing((2.5).seconds()).should.equal '2.5 segundos'
    humanizing((3.0).seconds()).should.equal '3 segundos'

  it 'humanizes part second, part millisecond numbers', ->
    humanizing(1001).should.equal '1 segundo, 1 milissegundo'
    humanizing(1002).should.equal '1 segundo, 2 milissegundos'
    humanizing(2001).should.equal '2 segundos, 1 milissegundo'
    humanizing((1.2).seconds()).should.equal '1 segundo, 200 milissegundos'
    humanizing((6.9).seconds()).should.equal '6 segundos, 900 milissegundos'

  it 'humanizes half-minute intervals', ->
    humanizing((0.5).minutes()).should.equal '0.5 minutos'
    humanizing((1.0).minutes()).should.equal '1 minuto'
    humanizing((1.5).minutes()).should.equal '1.5 minutos'
    humanizing((2.0).minutes()).should.equal '2 minutos'
    humanizing((2.5).minutes()).should.equal '2.5 minutos'
    humanizing((3.0).minutes()).should.equal '3 minutos'

  it 'humanizes 1 minute, part second intervals', ->
    humanizing((1).minute() + (1).second()).should.equal '1 minuto, 1 segundo'
    humanizing((1).minute() + (18).seconds()).should.equal '1 minuto, 18 segundos'

  it 'humanizes 1 minute, part second, part millisecond intervals', ->
    humanizing((1).minute() + (1).second() + 1).should.equal '1 minuto, 1 segundo, 1 milissegundo'
    humanizing((1).minute() + (1).second() + 5).should.equal '1 minuto, 1 segundo, 5 milissegundos'
    humanizing((1).minute() + (18).seconds() + 1).should.equal '1 minuto, 18 segundos, 1 milissegundo'
    humanizing((1).minute() + (18).seconds() + 12).should.equal '1 minuto, 18 segundos, 12 milissegundos'

  it 'humanizes 2 minute, part second intervals', ->
    humanizing((2).minutes() + (1).second()).should.equal '2 minutos, 1 segundo'
    humanizing((2).minutes() + (18).seconds()).should.equal '2 minutos, 18 segundos'

  it 'humanizes 2 minute, part second, part millisecond intervals', ->
    humanizing((2).minutes() + (1).second() + 1).should.equal '2 minutos, 1 segundo, 1 milissegundo'
    humanizing((2).minutes() + (1).second() + 5).should.equal '2 minutos, 1 segundo, 5 milissegundos'
    humanizing((2).minutes() + (18).seconds() + 1).should.equal '2 minutos, 18 segundos, 1 milissegundo'
    humanizing((2).minutes() + (18).seconds() + 12).should.equal '2 minutos, 18 segundos, 12 milissegundos'

  it 'humanizes half-hour intervals', ->
    humanizing((0.5).hours()).should.equal '0.5 horas'
    humanizing((1.0).hours()).should.equal '1 hora'
    humanizing((1.5).hours()).should.equal '1.5 horas'
    humanizing((2.0).hours()).should.equal '2 horas'
    humanizing((2.5).hours()).should.equal '2.5 horas'
    humanizing((3.0).hours()).should.equal '3 horas'

  it 'humanizes 1 hour, part minute intervals', ->
    humanizing((1).hour() + (1).minute()).should.equal '1 hora, 1 minuto'
    humanizing((1).hour() + (15).minutes()).should.equal '1 hora, 15 minutos'
    humanizing((1).hour() + (45).minutes()).should.equal '1 hora, 45 minutos'

  it 'humanizes 2 hour, part minute intervals', ->
    humanizing((2).hours() + (1).minute()).should.equal '2 horas, 1 minuto'
    humanizing((2).hours() + (15).minutes()).should.equal '2 horas, 15 minutos'
    humanizing((2).hours() + (45).minutes()).should.equal '2 horas, 45 minutos'

  it 'humanizes half-day intervals', ->
    humanizing((0.5).days()).should.equal '0.5 dias'
    humanizing((1.0).days()).should.equal '1 dia'
    humanizing((1.5).days()).should.equal '1.5 dias'
    humanizing((2.0).days()).should.equal '2 dias'
    humanizing((2.5).days()).should.equal '2.5 dias'
    humanizing((3.0).days()).should.equal '3 dias'

  it 'humanizes half-week intervals', ->
    humanizing((0.5).weeks()).should.equal '0.5 semanas'
    humanizing((1.0).weeks()).should.equal '1 semana'
    humanizing((1.5).weeks()).should.equal '1.5 semanas'
    humanizing((2.0).weeks()).should.equal '2 semanas'
    humanizing((2.5).weeks()).should.equal '2.5 semanas'
    humanizing((3.0).weeks()).should.equal '3 semanas'

  it 'humanizes half-month intervals', ->
    humanizing((0.5).months()).should.equal '0.5 meses'
    humanizing((1.0).months()).should.equal '1 mês'
    humanizing((1.5).months()).should.equal '1.5 meses'
    humanizing((2.0).months()).should.equal '2 meses'
    humanizing((2.5).months()).should.equal '2.5 meses'
    humanizing((3.0).months()).should.equal '3 meses'

  it 'humanizes half-year intervals', ->
    humanizing((0.5).years()).should.equal '0.5 anos'
    humanizing((1.0).years()).should.equal '1 ano'
    humanizing((1.5).years()).should.equal '1.5 anos'
    humanizing((2.0).years()).should.equal '2 anos'
    humanizing((2.5).years()).should.equal '2.5 anos'
    humanizing((3.0).years()).should.equal '3 anos'
