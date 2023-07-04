const { getSupportedLanguages } = require("..");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

describe("getSupportedLanguages", function () {
  it("lists all supported languages", function (done) {
    const definitionsPath = path.resolve(__dirname, "definitions");

    fs.readdir(definitionsPath, (err, files) => {
      if (err) {
        return done(err);
      }

      const languages = files
        .filter((file) => path.extname(file) === ".csv")
        .map((file) => path.basename(file, ".csv"));

      assert.deepStrictEqual(languages.sort(), getSupportedLanguages().sort());

      done();
    });
  });

  it("returns a different array each time", function () {
    assert.notStrictEqual(getSupportedLanguages(), getSupportedLanguages());
  });
});
