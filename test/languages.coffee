humanizeDuration = require ".."

fs = require "fs"
path = require "path"

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

  # Build a list of files to test
  languagesToTest = {}
  do ->

    definitionPath = path.resolve(__dirname, "definitions")
    definitionFiles = fs.readdirSync(definitionPath)

    for file in definitionFiles

      continue if path.extname(file) isnt ".csv"
      languageName = path.basename(file, ".csv")

      result = []

      filePath = path.resolve(definitionPath, file)
      csvData = fs.readFileSync(filePath, "utf-8")
      csvLines = csvData.lines()
      for line, i in csvLines
        [ms, expected] = line.split(",", 2)
        result.push [parseFloat(ms), expected]

      languagesToTest[languageName] = result

  # Test everything
  Object.each languagesToTest, (language, pairs) ->

    describe "for #{language}", ->

      it "humanizes with arguments", ->
        for pair in pairs
          result = humanizeDuration(pair[0], options(language))
          result.should.equal pair[1]

      it "humanizes with a humanizer", ->
        h = humanizeDuration.humanizer(options(language))
        for pair in pairs
          h(pair[0]).should.equal pair[1]
