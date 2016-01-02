var pkg = require('../package.json')
var bower = require('../bower.json')
var assert = require('assert')

describe('package.json', function () {
  it('has `bugs`', function () {
    assert.equal(typeof pkg.bugs, 'string')
  })
})

describe('package.json and bower.json', function () {
  [
    'name',
    'version',
    'keywords',
    'license',
    'main',
    'description',
    'repository',
    'homepage'
  ].forEach(function (key) {
    it('have the same ' + key, function () {
      assert.deepEqual(pkg[key], bower[key])
    })
  })

  it('have the same authors', function () {
    var pkgAuthors = [pkg.author].concat(pkg.contributors)
    assert.deepEqual(pkgAuthors, bower.authors)
  })

  it('are public', function () {
    assert(!pkg['private'])
    assert(!bower['private'])
  })

  it('have no dependencies', function () {
    assert(!pkg.dependencies)
    assert(!bower.dependencies)
  })
})
