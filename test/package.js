const pkg = require("../package.json");
const bower = require("../bower.json");
const assert = require("node:assert/strict");

describe("package.json", function () {
  it("has `bugs`", function () {
    assert.strictEqual(typeof pkg.bugs, "string");
  });
});

describe("package.json and bower.json", function () {
  it("have many of the same properties", function () {
    [
      "name",
      "version",
      "keywords",
      "license",
      "main",
      "description",
      "repository",
      "homepage",
    ].forEach((key) => {
      assert.deepStrictEqual(pkg[key], bower[key]);
    });
  });

  it("have the same authors", function () {
    const pkgAuthors = [pkg.author].concat(pkg.contributors);
    assert.deepStrictEqual(pkgAuthors, bower.authors);
  });

  it("are public", function () {
    assert(!pkg.private);
    assert(!bower.private);
  });

  it("have no dependencies", function () {
    assert(!pkg.dependencies);
    assert(!bower.dependencies);
  });
});
