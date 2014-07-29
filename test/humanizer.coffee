humanizeDuration = require ".."
humanizer = humanizeDuration.humanizer
require("chai").should()

describe "humanizer", ->

  it "humanizes English when passed no arguments", ->
    h = humanizer()
    h(1000).should.equal "1 second"

  it "humanizes English when passed an empty object", ->
    h = humanizer({})
    h(1000).should.equal "1 second"

  it "can change the delimiter", ->
    h = humanizer(delimiter: "+")
    h(0).should.equal "0"
    h(1000).should.equal "1 second"
    h(363000).should.equal "6 minutes+3 seconds"

  it "has properties which can be modified", ->
    h = humanizer()
    h(363000).should.equal "6 minutes, 3 seconds"
    h.delimiter = "+"
    h(363000).should.equal "6 minutes+3 seconds"
    h.language = "es"
    h(363000).should.equal "6 minutos+3 segundos"
    h.units = ["minutes"]
    h(363000).should.equal "6.05 minutos"

  it "is a named function", ->
    humanizer().name.should.equal "humanizer"
