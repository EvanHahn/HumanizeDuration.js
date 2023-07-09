// @ts-check

const humanizeDuration = require("..");
const { test } = require("node:test");
const assert = require("node:assert/strict");

// See https://github.com/EvanHahn/HumanizeDuration.js/issues/143
// for more here.

test('aliases "gr" to "el"', () => {
  assert.strictEqual(
    humanizeDuration(123456, { language: "gr" }),
    humanizeDuration(123456, { language: "el" })
  );
});

test('does not include "gr" in getSupportedLanguages', () => {
  const supportedLanguages = humanizeDuration.getSupportedLanguages();
  assert.strictEqual(supportedLanguages.indexOf("gr"), -1);
});
