// @ts-check

const humanizeDuration = require("..");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const parseCsv = require("csv-parse").parse;

// See https://github.com/EvanHahn/HumanizeDuration.js/issues/143
// for more here.

test('aliases "gr" to "el"', (t, done) => {
  const greekPath = path.resolve(__dirname, "definitions", "el.tsv");

  fs.readFile(greekPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      return done(err);
    }

    parseCsv(data, { delimiter: "\t" }, (err, rows) => {
      if (err) {
        return done(err);
      }

      rows.forEach((row) => {
        const ms = parseFloat(row[0]);

        const humanizedGr = humanizeDuration(ms, { language: "gr" });
        const humanizedEl = humanizeDuration(ms, { language: "el" });
        assert.strictEqual(humanizedGr, humanizedEl);
      });

      done();
    });
  });
});

test('does not include "gr" in getSupportedLanguages', () => {
  const supportedLanguages = humanizeDuration.getSupportedLanguages();
  assert.strictEqual(supportedLanguages.indexOf("gr"), -1);
});
