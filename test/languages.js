// @ts-check

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
  /** @type {Map<string, Array<[number, string]>>} */
  const languages = new Map();

  before(async function () {
    const definitionsPath = path.resolve(__dirname, "definitions");
    const definitionFileNames = (await readdir(definitionsPath)).filter(
      (f) => path.extname(f) === ".csv"
    );

    /**
     * @param {string} filePath
     * @returns {Promise<Array<[number, string]>>}
     */
    const readPairs = async (filePath) => {
      /** @type {Array<[number, string]>} */
      const result = [];

      const parser = fs
        .createReadStream(filePath)
        .pipe(parseCsv({ delimiter: "$" }));
      for await (const [msString, expectedResult] of parser) {
        result.push([parseFloat(msString), expectedResult]);
      }

      return result;
    };

    await Promise.all(
      definitionFileNames.map(async (fileName) => {
        const language = path.basename(fileName, ".csv");
        const filePath = path.join(definitionsPath, fileName);
        languages.set(language, await readPairs(filePath));
      })
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
