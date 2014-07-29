humanizing = require '..'
componentsOf = humanizing.componentsOf
require('chai').should()

describe 'base humanization function', ->

  it 'humanizes English by default', ->
    humanizing(8000).should.equal '8 seconds'

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

  it 'allows you to change the delimiter', ->
    result = humanizing(0, { delimiter: '+' })
    result.should.equal '0'
    result = humanizing(2.minutes(), { delimiter: '+' })
    result.should.equal '2 minutes'
    result = humanizing(2.minutes() + 18.seconds(), { delimiter: '+' })
    result.should.equal '2 minutes+18 seconds'

  it 'allows you to change the units without pluralization', ->
    result = humanizing(1.hour(), { units: ['minute'] })
    result.should.equal '60 minutes'

  it 'allows you to change the units with pluralization', ->
    result = humanizing(1.hour(), { units: ['minutes'] })
    result.should.equal '60 minutes'

  it 'makes a decimal of the smallest unit', ->
    result = humanizing 2.minutes() + 15.seconds(),
      units: ['minute', 'second']
    result.should.equal '2 minutes, 15 seconds'
    result = humanizing 2.minutes() + 15.seconds(),
      units: ['minute']
    result.should.equal '2.25 minutes'
    result = humanizing 2.minutes() + 15.seconds(),
      units: ['hour', 'minute']
    result.should.equal '2.25 minutes'
    result = humanizing 2.minutes() + 15.seconds(),
      units: ['hour']
    result.should.equal '0.0375 hours'
