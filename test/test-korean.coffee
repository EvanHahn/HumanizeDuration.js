humanizing = require('../humanize-duration')
require('chai').should()

describe 'Korean humanization of duration', ->

  beforeEach ->
    humanizing.language = 'ko'

  it 'humanizes 0ms', ->
    humanizing(0).should.equal '0'

  it 'humanizes 1ms', ->
    humanizing(1).should.equal '1 밀리 초'

  it 'humanizes multiple milliseconds', ->
    humanizing(2).should.equal '2 밀리 초'
    humanizing(5).should.equal '5 밀리 초'
    humanizing(12).should.equal '12 밀리 초'
    humanizing(420).should.equal '420 밀리 초'

  it 'humanizes half-second intervals', ->
    humanizing((0.5).seconds()).should.equal '0.5 초'
    humanizing((1.0).seconds()).should.equal '1 초'
    humanizing((1.5).seconds()).should.equal '1.5 초'
    humanizing((2.0).seconds()).should.equal '2 초'
    humanizing((2.5).seconds()).should.equal '2.5 초'
    humanizing((3.0).seconds()).should.equal '3 초'

  it 'humanizes part second, part millisecond numbers', ->
    humanizing(1001).should.equal '1 초, 1 밀리 초'
    humanizing(1002).should.equal '1 초, 2 밀리 초'
    humanizing(2001).should.equal '2 초, 1 밀리 초'
    humanizing((1.2).seconds()).should.equal '1 초, 200 밀리 초'
    humanizing((6.9).seconds()).should.equal '6 초, 900 밀리 초'

  it 'humanizes half-minute intervals', ->
    humanizing((0.5).minutes()).should.equal '0.5 분'
    humanizing((1.0).minutes()).should.equal '1 분'
    humanizing((1.5).minutes()).should.equal '1.5 분'
    humanizing((2.0).minutes()).should.equal '2 분'
    humanizing((2.5).minutes()).should.equal '2.5 분'
    humanizing((3.0).minutes()).should.equal '3 분'

  it 'humanizes 1 minute, part second intervals', ->
    humanizing((1).minute() + (1).second()).should.equal '1 분, 1 초'
    humanizing((1).minute() + (18).seconds()).should.equal '1 분, 18 초'

  it 'humanizes 1 minute, part second, part millisecond intervals', ->
    humanizing((1).minute() + (1).second() + 1).should.equal '1 분, 1 초, 1 밀리 초'
    humanizing((1).minute() + (1).second() + 5).should.equal '1 분, 1 초, 5 밀리 초'
    humanizing((1).minute() + (18).seconds() + 1).should.equal '1 분, 18 초, 1 밀리 초'
    humanizing((1).minute() + (18).seconds() + 12).should.equal '1 분, 18 초, 12 밀리 초'

  it 'humanizes 2 minute, part second intervals', ->
    humanizing((2).minutes() + (1).second()).should.equal '2 분, 1 초'
    humanizing((2).minutes() + (18).seconds()).should.equal '2 분, 18 초'

  it 'humanizes 2 minute, part second, part millisecond intervals', ->
    humanizing((2).minutes() + (1).second() + 1).should.equal '2 분, 1 초, 1 밀리 초'
    humanizing((2).minutes() + (1).second() + 5).should.equal '2 분, 1 초, 5 밀리 초'
    humanizing((2).minutes() + (18).seconds() + 1).should.equal '2 분, 18 초, 1 밀리 초'
    humanizing((2).minutes() + (18).seconds() + 12).should.equal '2 분, 18 초, 12 밀리 초'

  it 'humanizes half-hour intervals', ->
    humanizing((0.5).hours()).should.equal '0.5 시간'
    humanizing((1.0).hours()).should.equal '1 시간'
    humanizing((1.5).hours()).should.equal '1.5 시간'
    humanizing((2.0).hours()).should.equal '2 시간'
    humanizing((2.5).hours()).should.equal '2.5 시간'
    humanizing((3.0).hours()).should.equal '3 시간'

  it 'humanizes 1 hour, part minute intervals', ->
    humanizing((1).hour() + (1).minute()).should.equal '1 시간, 1 분'
    humanizing((1).hour() + (15).minutes()).should.equal '1 시간, 15 분'
    humanizing((1).hour() + (45).minutes()).should.equal '1 시간, 45 분'

  it 'humanizes 2 hour, part minute intervals', ->
    humanizing((2).hours() + (1).minute()).should.equal '2 시간, 1 분'
    humanizing((2).hours() + (15).minutes()).should.equal '2 시간, 15 분'
    humanizing((2).hours() + (45).minutes()).should.equal '2 시간, 45 분'

  it 'humanizes half-day intervals', ->
    humanizing((0.5).days()).should.equal '0.5 일'
    humanizing((1.0).days()).should.equal '1 일'
    humanizing((1.5).days()).should.equal '1.5 일'
    humanizing((2.0).days()).should.equal '2 일'
    humanizing((2.5).days()).should.equal '2.5 일'
    humanizing((3.0).days()).should.equal '3 일'

  it 'humanizes half-week intervals', ->
    humanizing((0.5).weeks()).should.equal '0.5 주일'
    humanizing((1.0).weeks()).should.equal '1 주일'
    humanizing((1.5).weeks()).should.equal '1.5 주일'
    humanizing((2.0).weeks()).should.equal '2 주일'
    humanizing((2.5).weeks()).should.equal '2.5 주일'
    humanizing((3.0).weeks()).should.equal '3 주일'

  it 'humanizes half-month intervals', ->
    humanizing((0.5).months()).should.equal '0.5 개월'
    humanizing((1.0).months()).should.equal '1 개월'
    humanizing((1.5).months()).should.equal '1.5 개월'
    humanizing((2.0).months()).should.equal '2 개월'
    humanizing((2.5).months()).should.equal '2.5 개월'
    humanizing((3.0).months()).should.equal '3 개월'

  it 'humanizes half-year intervals', ->
    humanizing((0.5).years()).should.equal '0.5 년'
    humanizing((1.0).years()).should.equal '1 년'
    humanizing((1.5).years()).should.equal '1.5 년'
    humanizing((2.0).years()).should.equal '2 년'
    humanizing((2.5).years()).should.equal '2.5 년'
    humanizing((3.0).years()).should.equal '3 년'
