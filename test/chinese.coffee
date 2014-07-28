humanizing = require '..'
require('chai').should()

describe 'Chinese humanization of duration', ->

  beforeEach ->
    humanizing.defaults.language = 'ch'

  it 'humanizes 0ms', ->
    humanizing(0).should.equal '0'

  it 'humanizes 1ms, 1s, 1m, 1h, 1d, 1w, 1mo, and 1y', ->
    humanizing(1.millisecond()).should.equal '1 毫秒'
    humanizing(1.second()).should.equal '1 秒'
    humanizing(1.minute()).should.equal '1 分钟'
    humanizing(1.hour()).should.equal '1 小时'
    humanizing(1.day()).should.equal '1 天'
    humanizing(1.week()).should.equal '1 周'
    humanizing(1.month()).should.equal '1 个月'
    humanizing(1.year()).should.equal '1 年'

  it 'humanizes 2ms, 2s, 2m, 2h, 2d, 2w, 2mo, and 2y', ->
    humanizing(2.milliseconds()).should.equal '2 毫秒'
    humanizing(2.seconds()).should.equal '2 秒'
    humanizing(2.minutes()).should.equal '2 分钟'
    humanizing(2.hours()).should.equal '2 小时'
    humanizing(2.days()).should.equal '2 天'
    humanizing(2.weeks()).should.equal '2 周'
    humanizing(2.months()).should.equal '2 个月'
    humanizing(2.years()).should.equal '2 年'