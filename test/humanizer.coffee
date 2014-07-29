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

  it "can change the units", ->
    h = humanizer(units: ["days"])
    h(0).should.equal "0"
    h(6.hours()).should.equal "0.25 days"
    h(7.days()).should.equal "7 days"

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

  it "can add a new language", ->
    h = humanizer({ language: "cool language" })
    h.languages["cool language"] =
      year: -> "y"
      month: -> "mo"
      week: -> "w"
      day: -> "d"
      hour: -> "h"
      minute: -> "mi"
      second: -> "s"
      millisecond: -> "ms"
    h(1000).should.equal "1 s"
    h(1000, { language: "es" }).should.equal "1 segundo"
    anotherH = humanizer({ language: "cool language" })
    (-> anotherH(1000)).should.throw Error

  it "can overwrite an existing language", ->
    h = humanizer(language: "en")
    h(1000).should.equal "1 second"
    h.languages["en"] =
      year: -> "y"
      month: -> "mo"
      week: -> "w"
      day: -> "d"
      hour: -> "h"
      minute: -> "mi"
      second: -> "s"
      millisecond: -> "ms"
    h(1000).should.equal "1 s"
    anotherH = humanizer(language: "en")
    anotherH(1000).should.equal "1 second"
