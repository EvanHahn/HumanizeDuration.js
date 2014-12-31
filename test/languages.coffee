humanizeDuration = require ".."

assert = require "assert"
fs = require "fs"
path = require "path"
parseCSV = require "csv-parse"

options = (language) ->
  return {
    language: language
    delimiter: "+"
    units: [
      "year"
      "month"
      "week"
      "day"
      "hour"
      "minute"
      "second"
      "millisecond"
    ]
  }

describe "localized humanization", ->

  definitionsPath = path.resolve(__dirname, "definitions")

  languages = []
  for file in fs.readdirSync(definitionsPath)
    if path.extname(file) is ".csv"
      languages.push path.basename(file, ".csv")

  languages.forEach (language) ->

    describe "for #{language}", ->

      pairs = null
      before (done) ->
        file = path.resolve(definitionsPath, language + ".csv")
        fs.readFile file, { encoding: "utf8" }, (err, data) ->
          return done(err) if err?
          parseCSV data, (err, rows) ->
            return done(err) if err?
            pairs = rows.map (r) -> [parseFloat(r[0]), r[1]]
            done()

      it "humanizes with arguments", ->
        for pair in pairs
          result = humanizeDuration(pair[0], options(language))
          assert.equal(result, pair[1])

      it "humanizes with a humanizer", ->
        h = humanizeDuration.humanizer(options(language))
        for pair in pairs
          assert.equal(h(pair[0]), pair[1])
