humanizeDuration = require ".."
getSupportedLanguages = humanizeDuration.getSupportedLanguages

assert = require "assert"
fs = require "fs"
path = require "path"

describe "getSupportedLanguages", ->

  it "lists all supported languages", ->

    definitionsPath = path.resolve(__dirname, "definitions")

    languages = []
    for file in fs.readdirSync(definitionsPath)
      if path.extname(file) is ".csv"
        languages.push path.basename(file, ".csv")

    assert.deepEqual(languages.sort(), getSupportedLanguages().sort())
