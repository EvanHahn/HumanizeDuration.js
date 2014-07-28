humanizing = require '..'
require('chai').should()

describe 'Polish humanization of duration', ->

  beforeEach ->
    humanizing.defaults.language = 'pl'

  it 'humanizes 0ms', ->
    humanizing(0).should.equal '0'

  it 'humanizes 1ms', ->
    humanizing(1).should.equal '1 milisekunda'

  it 'humanizes multiple milliseconds', ->
    humanizing(2).should.equal '2 milisekundy'
    humanizing(5).should.equal '5 milisekund'
    humanizing(12).should.equal '12 milisekund'
    humanizing(420).should.equal '420 milisekund'

  it 'humanizes half-second intervals', ->
    humanizing((0.5).seconds()).should.equal '0.5 sekundy'
    humanizing((1.0).seconds()).should.equal '1 sekunda'
    humanizing((1.5).seconds()).should.equal '1.5 sekundy'
    humanizing((2.0).seconds()).should.equal '2 sekundy'
    humanizing((2.5).seconds()).should.equal '2.5 sekundy'
    humanizing((3.0).seconds()).should.equal '3 sekundy'
    humanizing((5.0).seconds()).should.equal '5 sekund'
    humanizing((5.5).seconds()).should.equal '5.5 sekundy'

  it 'humanizes part second, part millisecond numbers', ->
    humanizing(1001).should.equal '1 sekunda, 1 milisekunda'
    humanizing(1002).should.equal '1 sekunda, 2 milisekundy'
    humanizing(2001).should.equal '2 sekundy, 1 milisekunda'
    humanizing(5008).should.equal '5 sekund, 8 milisekund'
    humanizing((1.2).seconds()).should.equal '1 sekunda, 200 milisekund'
    humanizing((6.912).seconds()).should.equal '6 sekund, 912 milisekund'
    humanizing((6.932).seconds()).should.equal '6 sekund, 932 milisekundy'
    humanizing((6.980).seconds()).should.equal '6 sekund, 980 milisekund'

  it 'humanizes half-minute intervals', ->
    humanizing((0.5).minutes()).should.equal '0.5 minuty'
    humanizing((1.0).minutes()).should.equal '1 minuta'
    humanizing((1.5).minutes()).should.equal '1.5 minuty'
    humanizing((2.0).minutes()).should.equal '2 minuty'
    humanizing((2.5).minutes()).should.equal '2.5 minuty'
    humanizing((3.0).minutes()).should.equal '3 minuty'
    humanizing((5.0).minutes()).should.equal '5 minut'
    humanizing((5.5).minutes()).should.equal '5.5 minuty'

  it 'humanizes 1 minute, part second intervals', ->
    humanizing((1).minute() + (1).second()).should.equal '1 minuta, 1 sekunda'
    humanizing((1).minute() + (18).seconds()).should.equal '1 minuta, 18 sekund'
    humanizing((1).minute() + (32).seconds()).should.equal '1 minuta, 32 sekundy'

  it 'humanizes 1 minute, part second, part millisecond intervals', ->
    humanizing((1).minute() + (1).second() + 1).should.equal '1 minuta, 1 sekunda, 1 milisekunda'
    humanizing((1).minute() + (1).second() + 5).should.equal '1 minuta, 1 sekunda, 5 milisekund'
    humanizing((1).minute() + (18).seconds() + 1).should.equal '1 minuta, 18 sekund, 1 milisekunda'
    humanizing((1).minute() + (18).seconds() + 2).should.equal '1 minuta, 18 sekund, 2 milisekundy'

  it 'humanizes 2 minute, part second intervals', ->
    humanizing((2).minutes() + (1).second()).should.equal '2 minuty, 1 sekunda'
    humanizing((2).minutes() + (18).seconds()).should.equal '2 minuty, 18 sekund'

  it 'humanizes 2 minute, part second, part millisecond intervals', ->
    humanizing((2).minutes() + (1).second() + 1).should.equal '2 minuty, 1 sekunda, 1 milisekunda'
    humanizing((2).minutes() + (1).second() + 5).should.equal '2 minuty, 1 sekunda, 5 milisekund'
    humanizing((2).minutes() + (18).seconds() + 1).should.equal '2 minuty, 18 sekund, 1 milisekunda'
    humanizing((2).minutes() + (18).seconds() + 2).should.equal '2 minuty, 18 sekund, 2 milisekundy'

  it 'humanizes half-hour intervals', ->
    humanizing((0.5).hours()).should.equal '0.5 godziny'
    humanizing((1.0).hours()).should.equal '1 godzina'
    humanizing((1.5).hours()).should.equal '1.5 godziny'
    humanizing((2.0).hours()).should.equal '2 godziny'
    humanizing((2.5).hours()).should.equal '2.5 godziny'
    humanizing((3.0).hours()).should.equal '3 godziny'
    humanizing((5.0).hours()).should.equal '5 godzin'
    humanizing((5.5).hours()).should.equal '5.5 godziny'

  it 'humanizes 1 hour, part minute intervals', ->
    humanizing((1).hour() + (1).minute()).should.equal '1 godzina, 1 minuta'
    humanizing((1).hour() + (2).minute()).should.equal '1 godzina, 2 minuty'
    humanizing((1).hour() + (15).minutes()).should.equal '1 godzina, 15 minut'
    humanizing((1).hour() + (45).minutes()).should.equal '1 godzina, 45 minut'

  it 'humanizes 2 hour, part minute intervals', ->
    humanizing((2).hours() + (1).minute()).should.equal '2 godziny, 1 minuta'
    humanizing((2).hours() + (22).minute()).should.equal '2 godziny, 22 minuty'
    humanizing((2).hours() + (15).minutes()).should.equal '2 godziny, 15 minut'
    humanizing((2).hours() + (45).minutes()).should.equal '2 godziny, 45 minut'

  it 'humanizes half-day intervals', ->
    humanizing((0.5).days()).should.equal '0.5 dnia'
    humanizing((1.0).days()).should.equal '1 dzień'
    humanizing((1.5).days()).should.equal '1.5 dnia'
    humanizing((2.0).days()).should.equal '2 dni'
    humanizing((2.5).days()).should.equal '2.5 dnia'
    humanizing((3.0).days()).should.equal '3 dni'
    humanizing((5.0).days()).should.equal '5 dni'
    humanizing((5.5).days()).should.equal '5.5 dnia'

  it 'humanizes half-week intervals', ->
    humanizing((0.5).weeks()).should.equal '0.5 tygodnia'
    humanizing((1.0).weeks()).should.equal '1 tydzień'
    humanizing((1.5).weeks()).should.equal '1.5 tygodnia'
    humanizing((2.0).weeks()).should.equal '2 tygodnie'
    humanizing((2.5).weeks()).should.equal '2.5 tygodnia'
    humanizing((3.0).weeks()).should.equal '3 tygodnie'

  it 'humanizes half-month intervals', ->
    humanizing((0.5).months()).should.equal '0.5 miesiąca'
    humanizing((1.0).months()).should.equal '1 miesiąc'
    humanizing((1.5).months()).should.equal '1.5 miesiąca'
    humanizing((2.0).months()).should.equal '2 miesiące'
    humanizing((2.5).months()).should.equal '2.5 miesiąca'
    humanizing((3.0).months()).should.equal '3 miesiące'
    humanizing((5.0).months()).should.equal '5 miesięcy'
    humanizing((5.5).months()).should.equal '5.5 miesiąca'

  it 'humanizes half-year intervals', ->
    humanizing((0.5).years()).should.equal '0.5 roku'
    humanizing((1.0).years()).should.equal '1 rok'
    humanizing((1.5).years()).should.equal '1.5 roku'
    humanizing((2.0).years()).should.equal '2 lata'
    humanizing((2.5).years()).should.equal '2.5 roku'
    humanizing((3.0).years()).should.equal '3 lata'
    humanizing((5.0).years()).should.equal '5 lat'
    humanizing((5.5).years()).should.equal '5.5 roku'
