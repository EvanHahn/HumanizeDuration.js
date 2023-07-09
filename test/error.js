// @ts-check

const humanizeDuration = require("..");
const { test } = require("node:test");
const assert = require("node:assert/strict");

test("throws an error when passed a bad language in the function", () => {
  const humanizingWith = (options) => () => humanizeDuration(10000, options);

  assert.throws(humanizingWith({ language: "EN" }), Error);
  assert.throws(humanizingWith({ language: "bad language" }), Error);
  assert.throws(humanizingWith({ language: "" }), Error);
  assert.throws(humanizingWith({ language: null }), Error);
  assert.throws(
    humanizingWith({ language: "bad language", fallback: null }),
    Error
  );
});

test("throws an error when passed a bad language in a humanizer", () => {
  const humanizer = humanizeDuration.humanizer({
    language: "bad language",
  });
  const humanizing = (options) => () => humanizer(10000, options);

  assert.throws(humanizing(), Error);
  assert.throws(humanizing({ language: "EN" }), Error);
  assert.throws(humanizing({ language: "bad language" }), Error);
  assert.throws(humanizing({ language: "" }), Error);
  assert.throws(humanizing({ language: null }), Error);
  assert.doesNotThrow(humanizing({ language: "es" }), Error);
  assert.throws(humanizing({ language: ["es", "en"] }), Error);
});

test("should throw if fallbacks configuration is invalid", () => {
  const humanizingWith = (options) => () => humanizeDuration(10000, options);

  assert.throws(humanizingWith({ language: "es", fallbacks: [] }), Error);
  assert.throws(
    humanizingWith({ language: "es", fallbacks: undefined }),
    Error
  );
  assert.throws(humanizingWith({ language: "es", fallbacks: null }), Error);
  assert.throws(humanizingWith({ language: "es", fallbacks: "en" }), Error);
});
