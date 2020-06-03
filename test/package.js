const pkg = require("../package.json");
const bower = require("../bower.json");
const assert = require("assert");

describe("package.json", () => {
  it("has `bugs`", () => {
    assert.strictEqual(typeof pkg.bugs, "string");
  });
});

describe("package.json and bower.json", () => {
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
    it("have the same " + key, () => {
      assert.deepStrictEqual(pkg[key], bower[key]);
    });
  });

  it("have the same authors", () => {
    const pkgAuthors = [pkg.author].concat(pkg.contributors);
    assert.deepStrictEqual(pkgAuthors, bower.authors);
  });

  it("are public", () => {
    assert(!pkg.private);
    assert(!bower.private);
  });

  it("have no dependencies", () => {
    assert(!pkg.dependencies);
    assert(!bower.dependencies);
  });
});
