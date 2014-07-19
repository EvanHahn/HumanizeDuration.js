humanizing = require('../humanize-duration')
componentsOf = humanizing.componentsOf
require('chai').should()

describe 'Russian humanization of duration', ->

  beforeEach ->
    humanizing.language = 'ru'

  it 'humanizes 0ms', ->
    humanizing(0).should.equal '0'

  it 'humanizes 1ms', ->
    humanizing(1).should.equal '1 миллисекунда'

  it 'humanizes multiple milliseconds', ->
    humanizing(2).should.equal '2 миллисекунды'
    humanizing(5).should.equal '5 миллисекунд'
    humanizing(12).should.equal '12 миллисекунд'
    humanizing(420).should.equal '420 миллисекунд'

  it 'humanizes negative milliseconds as positive', ->
    humanizing(-420).should.equal '420 миллисекунд'

  it 'humanizes parts of milliseconds', ->
    humanizing(0.12).should.equal '0.12 миллисекунды'
    humanizing(1.5).should.equal '1.5 миллисекунды'
    humanizing(420.69).should.equal '420.69 миллисекунды'

  it 'humanizes half-second intervals', ->
    humanizing((0.5).seconds()).should.equal '0.5 секунды'
    humanizing((1.0).seconds()).should.equal '1 секунда'
    humanizing((1.5).seconds()).should.equal '1.5 секунды'
    humanizing((2.0).seconds()).should.equal '2 секунды'
    humanizing((2.5).seconds()).should.equal '2.5 секунды'
    humanizing((3.0).seconds()).should.equal '3 секунды'
    humanizing((5.0).seconds()).should.equal '5 секунд'

  it 'humanizes part second, part millisecond numbers', ->
    humanizing(1001).should.equal '1 секунда, 1 миллисекунда'
    humanizing(1002).should.equal '1 секунда, 2 миллисекунды'
    humanizing(2001).should.equal '2 секунды, 1 миллисекунда'
    humanizing((1.2).seconds()).should.equal '1 секунда, 200 миллисекунд'
    humanizing((6.9).seconds()).should.equal '6 секунд, 900 миллисекунд'

  it 'humanizes half-minute intervals', ->
    humanizing((0.5).minutes()).should.equal '0.5 минуты'
    humanizing((1.0).minutes()).should.equal '1 минута'
    humanizing((1.5).minutes()).should.equal '1.5 минуты'
    humanizing((2.0).minutes()).should.equal '2 минуты'
    humanizing((2.5).minutes()).should.equal '2.5 минуты'
    humanizing((3.0).minutes()).should.equal '3 минуты'

  it 'humanizes 1 minute, part second intervals', ->
    humanizing(1.minute() + 1.second()).should.equal '1 минута, 1 секунда'
    humanizing(1.minute() + 18.seconds()).should.equal '1 минута, 18 секунд'

  it 'humanizes 1 minute, part second, part millisecond intervals', ->
    humanizing(1.minute() + 1.second() + 1).should.equal '1 минута, 1 секунда, 1 миллисекунда'
    humanizing(1.minute() + 1.second() + 5).should.equal '1 минута, 1 секунда, 5 миллисекунд'
    humanizing(1.minute() + 18.seconds() + 1).should.equal '1 минута, 18 секунд, 1 миллисекунда'
    humanizing(1.minute() + 18.seconds() + 12).should.equal '1 минута, 18 секунд, 12 миллисекунд'

  it 'humanizes 2 minute, part second intervals', ->
    humanizing(2.minutes() + 1.second()).should.equal '2 минуты, 1 секунда'
    humanizing(2.minutes() + 18.seconds()).should.equal '2 минуты, 18 секунд'

  it 'humanizes 2 minute, part second, part millisecond intervals', ->
    humanizing(2.minutes() + 1.second() + 1).should.equal '2 минуты, 1 секунда, 1 миллисекунда'
    humanizing(2.minutes() + 1.second() + 5).should.equal '2 минуты, 1 секунда, 5 миллисекунд'
    humanizing(2.minutes() + 18.seconds() + 1).should.equal '2 минуты, 18 секунд, 1 миллисекунда'
    humanizing(2.minutes() + 18.seconds() + 12).should.equal '2 минуты, 18 секунд, 12 миллисекунд'

  it 'humanizes half-hour intervals', ->
    humanizing((0.5).hours()).should.equal '0.5 часа'
    humanizing((1.0).hours()).should.equal '1 час'
    humanizing((1.5).hours()).should.equal '1.5 часа'
    humanizing((2.0).hours()).should.equal '2 часа'
    humanizing((2.5).hours()).should.equal '2.5 часа'
    humanizing((3.0).hours()).should.equal '3 часа'

  it 'humanizes 1 hour, part minute intervals', ->
    humanizing(1.hour() + 1.minute()).should.equal '1 час, 1 минута'
    humanizing(1.hour() + 15.minutes()).should.equal '1 час, 15 минут'
    humanizing(1.hour() + 45.minutes()).should.equal '1 час, 45 минут'

  it 'humanizes 2 hour, part minute intervals', ->
    humanizing(2.hours() + 1.minute()).should.equal '2 часа, 1 минута'
    humanizing(2.hours() + 15.minutes()).should.equal '2 часа, 15 минут'
    humanizing(2.hours() + 45.minutes()).should.equal '2 часа, 45 минут'

  it 'humanizes half-day intervals', ->
    humanizing((0.5).days()).should.equal '0.5 дня'
    humanizing((1.0).days()).should.equal '1 день'
    humanizing((1.5).days()).should.equal '1.5 дня'
    humanizing((2.0).days()).should.equal '2 дня'
    humanizing((2.5).days()).should.equal '2.5 дня'
    humanizing((3.0).days()).should.equal '3 дня'

  it 'humanizes half-week intervals', ->
    humanizing((0.5).weeks()).should.equal '0.5 недели'
    humanizing((1.0).weeks()).should.equal '1 неделя'
    humanizing((1.5).weeks()).should.equal '1.5 недели'
    humanizing((2.0).weeks()).should.equal '2 недели'
    humanizing((2.5).weeks()).should.equal '2.5 недели'
    humanizing((3.0).weeks()).should.equal '3 недели'

  it 'humanizes half-month intervals', ->
    humanizing((0.5).months()).should.equal '0.5 месяца'
    humanizing((1.0).months()).should.equal '1 месяц'
    humanizing((1.5).months()).should.equal '1.5 месяца'
    humanizing((2.0).months()).should.equal '2 месяца'
    humanizing((2.5).months()).should.equal '2.5 месяца'
    humanizing((3.0).months()).should.equal '3 месяца'

  it 'humanizes half-year intervals', ->
    humanizing((0.5).years()).should.equal '0.5 года'
    humanizing((1.0).years()).should.equal '1 год'
    humanizing((1.5).years()).should.equal '1.5 года'
    humanizing((2.0).years()).should.equal '2 года'
    humanizing((2.5).years()).should.equal '2.5 года'
    humanizing((3.0).years()).should.equal '3 года'

  it 'works with Number objects with a value of 0', ->
    duration = new Number(0)
    humanizing(duration).should.equal '0'

  it 'works with non-zero Number objects', ->
    duration = new Number(61000)
    humanizing(duration).should.equal '1 минута, 1 секунда'

  it 'keeps Number objects intact', ->
    duration = new Number(2012)
    humanizing duration
    duration.valueOf().should.equal 2012

  it 'can grab the components', ->
    duration = 5.days() + 126.minutes() + 4.seconds() + 20.milliseconds()
    components = componentsOf duration
    components.years.should.equal '0 лет'
    components.total.years.should.equal '0 лет'
    components.months.should.equal '0 месяцев'
    components.total.months.should.equal '0 месяцев'
    components.days.should.equal '5 дней'
    components.total.days.should.equal '5 дней'
    components.hours.should.equal '2 часа'
    components.total.hours.should.equal '122 часа'
    components.minutes.should.equal '6 минут'
    components.total.minutes.should.equal '7326 минут'
    components.seconds.should.equal '4 секунды'
    components.total.seconds.should.equal '439564 секунды'
    components.milliseconds.should.equal '20 миллисекунд'
    components.total.milliseconds.should.equal '439564020 миллисекунд'

  it 'can grab components of fractioned milliseconds', ->
    duration = 420.69
    components = componentsOf duration
    components.seconds.should.equal '0 секунд'
    components.total.seconds.should.equal '0 секунд'
    components.milliseconds.should.equal '420.69 миллисекунды'
    components.total.milliseconds.should.equal '420.69 миллисекунды'

  it 'grabs the components and keeps the Number objects intact', ->
    duration = new Number(420420)
    componentsOf duration
    duration.valueOf().should.equal 420420
