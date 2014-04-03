humanizing = require("../humanize-duration")
require("chai").should()
describe "French humanization of duration", ->
  "use strict"
  beforeEach ->
    humanizing.language = "en"
    return

  it "humanizes 0ms", ->
    humanizing(0).should.equal "0"
    return

  it "humanizes French when passed as an argument", ->
    humanizing((1).second(), "pt").should.equal "1 segundo"
    humanizing((2).seconds(), "pt").should.equal "2 segundos"
    humanizing((5).years(), "pt").should.equal "5 anos"
    return

  it "humanizes French when the default language is changed", ->
    humanizing.language = "pt"
    humanizing((1).second()).should.equal "1 segundo"
    humanizing((2).seconds()).should.equal "2 segundos"
    humanizing((5).years()).should.equal "5 anos"
    return

  return

