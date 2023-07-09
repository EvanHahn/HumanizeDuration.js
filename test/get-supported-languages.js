// @ts-check

const humanizeDuration = require("..");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const { getSupportedLanguages } = humanizeDuration;

test("getSupportedLanguages lists all supported languages", (t, done) => {
  const definitionsPath = path.resolve(__dirname, "definitions");

  fs.readdir(definitionsPath, (err, files) => {
    if (err) {
      return done(err);
    }

    const languages = files
      .filter((file) => path.extname(file) === ".tsv")
      .map((file) => path.basename(file, ".tsv"));

    assert.deepStrictEqual(languages.sort(), getSupportedLanguages().sort());

    done();
  });
});

test("getSupportedLanguages returns a different array each time", () => {
  assert.notStrictEqual(getSupportedLanguages(), getSupportedLanguages());
});
