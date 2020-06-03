const humanizeDuration = require("..");
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const parseCSV = require("csv-parse");

describe("legacy Greek support", () => {
  // See https://github.com/EvanHahn/HumanizeDuration.js/issues/143
  // for more here.

  it('aliases "gr" to "el"', (done) => {
    const greekPath = path.resolve(__dirname, "definitions", "el.csv");

    fs.readFile(greekPath, { encoding: "utf8" }, (err, data) => {
      if (err) {
        return done(err);
      }

      parseCSV(data, { delimiter: "$" }, (err, rows) => {
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

  it('does not include "gr" in getSupportedLanguages', () => {
    const supportedLanguages = humanizeDuration.getSupportedLanguages();
    assert.strictEqual(supportedLanguages.indexOf("gr"), -1);
  });
});
