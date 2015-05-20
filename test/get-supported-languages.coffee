{getSupportedLanguages} = require ".."

assert = require "assert"
fs = require "fs"
path = require "path"

describe "getSupportedLanguages", ->

  it "lists all supported languages", ->

    definitionsPath = path.resolve(__dirname, "definitions")

    fs.readdir definitionsPath, (err, files) ->
      throw err if err

      languages = []
      files.forEach file ->
        if path.extname(file) is ".csv"
          languages.push path.basename(file, ".csv")

      assert.deepEqual(languages.sort(), getSupportedLanguages().sort())
