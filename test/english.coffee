humanizing = require '..'
componentsOf = humanizing.componentsOf
require('chai').should()

describe 'English humanization of duration', ->

  beforeEach ->
    humanizing.defaults.language = 'en'

  it 'humanizes negative milliseconds as positive', ->
    humanizing(-420).should.equal '420 milliseconds'

  it 'humanizes parts of milliseconds', ->
    humanizing(0.12).should.equal '0.12 milliseconds'
    humanizing(1.5).should.equal '1.5 milliseconds'
    humanizing(420.69).should.equal '420.69 milliseconds'

  it 'works with Number objects with a value of 0', ->
    duration = new Number(0)
    humanizing(duration).should.equal '0'

  it 'works with non-zero Number objects', ->
    duration = new Number(61000)
    humanizing(duration).should.equal '1 minute, 1 second'

  it 'keeps Number objects intact', ->
    duration = new Number(2012)
    humanizing duration
    duration.valueOf().should.equal 2012

  it 'allows you to change the delimiter with an argument', ->
    result = humanizing(2.minutes(), { delimiter: '+' })
    result.should.equal '2 minutes'
    result = humanizing(2.minutes() + 18.seconds() + 1, { delimiter: '+' })
    result.should.equal '2 minutes+18 seconds+1 millisecond'

  it 'allows you to change the delimiter by changing defaults', ->
    oldDelimiter = humanizing.defaults.delimiter
    humanizing.defaults.delimiter = '+'
    humanizing(2.minutes()).should.equal '2 minutes'
    humanizing(2.minutes() + 18.seconds() + 1)
      .should.equal '2 minutes+18 seconds+1 millisecond'
    humanizing(2.minutes() + 18.seconds() + 1, { delimiter: 'X' })
      .should.equal '2 minutesX18 secondsX1 millisecond'
    humanizing.defaults.delimiter = oldDelimiter

  describe 'componentsOf', ->

    it 'can grab the components', ->
      duration = 5.days() + 126.minutes() + 4.seconds() + 20.milliseconds()
      components = componentsOf duration
      components.years.should.equal '0 years'
      components.total.years.should.equal '0 years'
      components.months.should.equal '0 months'
      components.total.months.should.equal '0 months'
      components.days.should.equal '5 days'
      components.total.days.should.equal '5 days'
      components.hours.should.equal '2 hours'
      components.total.hours.should.equal '122 hours'
      components.minutes.should.equal '6 minutes'
      components.total.minutes.should.equal '7326 minutes'
      components.seconds.should.equal '4 seconds'
      components.total.seconds.should.equal '439564 seconds'
      components.milliseconds.should.equal '20 milliseconds'
      components.total.milliseconds.should.equal '439564020 milliseconds'

    it 'can grab components of fractioned milliseconds', ->
      duration = 420.69
      components = componentsOf duration
      components.seconds.should.equal '0 seconds'
      components.total.seconds.should.equal '0 seconds'
      components.milliseconds.should.equal '420.69 milliseconds'
      components.total.milliseconds.should.equal '420.69 milliseconds'

    it 'grabs the components and keeps the Number objects intact', ->
      duration = new Number(420420)
      componentsOf duration
      duration.valueOf().should.equal 420420
