const humanizeDuration = require("..");
const { before, describe, it } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const parseCsv = require("csv-parse").parse;
const { promisify } = require("node:util");

const readdir = promisify(fs.readdir);

const options = (language) => ({
  language,
  delimiter: "+",
  units: ["y", "mo", "w", "d", "h", "m", "s", "ms"],
});

describe("localized humanization", function () {
  let languages;

  before(async function () {
    const definitionsPath = path.resolve(__dirname, "definitions");
    const definitionFilePaths = (await readdir(definitionsPath))
      .filter((f) => path.extname(f) === ".csv")
      .map((f) => path.join(definitionsPath, f));
    languages = new Map(
      await Promise.all(
        definitionFilePaths.map(async (filePath) => {
          const language = path.basename(filePath, ".csv");

          const parser = fs
            .createReadStream(filePath)
            .pipe(parseCsv({ delimiter: "$" }));
          const pairs = [];
          for await (const [msString, expectedResult] of parser) {
            pairs.push([parseFloat(msString), expectedResult]);
          }

          return [language, pairs];
        })
      )
    );

    assert(languages.has("en"), "Definition smoke test failed");
    assert(languages.has("es"), "Definition smoke test failed");
  });

  it("humanizes all languages correctly with the top-level function", function () {
    for (const [language, pairs] of languages) {
      for (const [ms, expectedResult] of pairs) {
        assert.strictEqual(
          humanizeDuration(ms, options(language)),
          expectedResult,
          `${language} localization error for ${ms} milliseconds`
        );
      }
    }
  });

  it("humanizes all languages correctly with a humanizer", function () {
    for (const [language, pairs] of languages) {
      const h = humanizeDuration.humanizer(options(language));
      for (const [ms, expectedResult] of pairs) {
        assert.strictEqual(
          h(ms),
          expectedResult,
          `${language} localization error ${ms} milliseconds`
        );
      }
    }
  });
});
