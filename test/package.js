// @ts-check

const pkg = require("../package.json");
const bower = require("../bower.json");
const { test } = require("node:test");
const assert = require("node:assert/strict");

test("package.json has `bugs`", () => {
  assert.strictEqual(typeof pkg.bugs, "string");
});

test("package.json and bower.json largely match", () => {
  assert.strictEqual(pkg.name, bower.name);
  assert.strictEqual(pkg.version, bower.version);
  assert.deepStrictEqual(pkg.keywords, bower.keywords);
  assert.strictEqual(pkg.license, bower.license);
  assert.strictEqual(pkg.main, bower.main);
  assert.strictEqual(pkg.description, bower.description);
  assert.deepStrictEqual(pkg.repository, bower.repository);
  assert.strictEqual(pkg.homepage, bower.homepage);

  const pkgAuthors = [pkg.author].concat(pkg.contributors);
  assert.deepStrictEqual(pkgAuthors, bower.authors);

  assert(!("private" in pkg));
  assert(!("private" in bower));

  assert(!("dependencies" in pkg));
  assert(!("dependencies" in bower));
});
