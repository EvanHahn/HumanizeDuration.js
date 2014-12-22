humanizing = require '..'
assert = require 'assert'
ms = require 'ms'

describe 'base humanization function', ->

  it 'humanizes English by default', ->
    assert.equal humanizing(8000), '8 seconds'

  it 'works with Number objects with a value of 0', ->
    duration = new Number(0)
    assert.equal humanizing(duration), '0'

  it 'works with non-zero Number objects', ->
    duration = new Number(61000)
    assert.equal humanizing(duration), '1 minute, 1 second'

  it 'keeps Number objects intact', ->
    duration = new Number(2012)
    humanizing duration
    assert.equal duration.valueOf(), 2012

  it 'allows you to change the delimiter', ->
    result = humanizing(0, { delimiter: '+' })
    assert.equal result, '0'
    result = humanizing(ms('2m'), { delimiter: '+' })
    assert.equal result, '2 minutes'
    result = humanizing(ms('2m') + ms('18s'), { delimiter: '+' })
    assert.equal result, '2 minutes+18 seconds'

  it 'allows you to change the units without pluralization', ->
    result = humanizing(ms('1h'), { units: ['minute'] })
    assert.equal result, '60 minutes'

  it 'allows you to change the units with pluralization', ->
    result = humanizing(ms('1h'), { units: ['minutes'] })
    assert.equal result, '60 minutes'

  it 'makes a decimal of the smallest unit', ->
    time = ms('2m') + ms('15s')
    result = humanizing time, units: ['minute', 'second']
    assert.equal result, '2 minutes, 15 seconds'
    result = humanizing time, units: ['minute']
    assert.equal result, '2.25 minutes'
    result = humanizing time, units: ['hour', 'minute']
    assert.equal result, '2.25 minutes'
    result = humanizing time, units: ['hour']
    assert.equal result, '0.0375 hours'
