const humanizeDuration = require("..");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const WEEK = 604800000;

test("uses the right Slovenian plural form for weeks", () => {
  /** @type {Array<[number, string]>} */
  const cases = [
    [1, "1 teden"],
    [2, "2 tedna"],
    [3, "3 tedne"],
    [4, "4 tedne"],
    [5, "5 tednov"],
    [11, "11 tednov"],
    [12, "12 tednov"],
    [13, "13 tednov"],
    [21, "21 tednov"],
    [22, "22 tednov"],
    [23, "23 tednov"],
    [101, "101 teden"],
    [102, "102 tedna"],
    [103, "103 tedne"],
    [111, "111 tednov"],
  ];

  for (const [weeks, expected] of cases) {
    assert.equal(
      humanizeDuration(weeks * WEEK, { language: "sl", units: ["w"] }),
      expected
    );
  }
});
