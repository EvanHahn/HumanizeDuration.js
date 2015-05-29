humanizeDuration = require ".."
humanizer = humanizeDuration.humanizer
assert = require "assert"
ms = require "ms"

describe "humanizer", ->

  it "humanizes English when passed no arguments", ->
    h = humanizer()
    assert.equal h(1000), "1 second"

  it "humanizes English when passed an empty object", ->
    h = humanizer({})
    assert.equal h(1000), "1 second"

  it "can change the delimiter", ->
    h = humanizer(delimiter: "+")
    assert.equal h(0), "0 seconds"
    assert.equal h(1000), "1 second"
    assert.equal h(363000), "6 minutes+3 seconds"

  it "can change the spacer", ->
    h = humanizer(spacer: " whole ")
    assert.equal h(0), '0 whole seconds'
    assert.equal h(1000), '1 whole second'
    assert.equal h(260040000), '3 whole days, 14 whole minutes'

  it "can change the units", ->
    h = humanizer(units: ["d"])
    assert.equal h(0), "0 days"
    assert.equal h(ms("6h")), "0.25 days"
    assert.equal h(ms("7d")), "7 days"

  it "has properties which can be modified", ->
    h = humanizer()
    assert.equal h(363000), "6 minutes, 3 seconds"
    h.delimiter = "+"
    assert.equal h(363000), "6 minutes+3 seconds"
    h.language = "es"
    assert.equal h(363000), "6 minutos+3 segundos"
    h.units = ["m"]
    assert.equal h(363000), "6.05 minutos"

  it "is a named function", ->
    assert.equal(humanizer().name, "humanizer")

  it "can add a new language", ->
    h = humanizer({ language: "cool language" })
    h.languages["cool language"] =
      y: -> "y"
      mo: -> "mo"
      w: -> "w"
      d: -> "d"
      h: -> "h"
      m: -> "mi"
      s: -> "s"
      ms: -> "ms"
    assert.equal h(1000), "1 s"
    assert.equal h(1000, { language: "es" }), "1 segundo"
    anotherH = humanizer({ language: "cool language" })
    assert.throws((-> anotherH(1000)), Error)

  it "can overwrite an existing language", ->
    h = humanizer(language: "en")
    assert.equal h(1000), "1 second"
    h.languages["en"] =
      y: -> "y"
      mo: -> "mo"
      w: -> "w"
      d: -> "d"
      h: -> "h"
      m: -> "m"
      s: -> "s"
      ms: -> "ms"
    assert.equal h(1000), "1 s"
    assert.equal h(15600000), "4 h, 20 m"
    anotherH = humanizer(language: "en")
    assert.equal anotherH(1000), "1 second"

  it "can overwrite the languages property in the initializer", ->
    h = humanizer
      languages:
        en:
          y: -> "y"
          mo: -> "mo"
          w: -> "w"
          d: -> "d"
          h: -> "h"
          m: -> "m"
          s: -> "s"
          ms: -> "ms"
    assert.equal h(1000), "1 s"
    assert.equal h(15600000), "4 h, 20 m"
