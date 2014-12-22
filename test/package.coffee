pkg = require '../package.json'
bower = require '../bower.json'

assert = require 'assert'

describe 'package.json', ->

  it 'has `bugs`', ->
    assert.equal typeof pkg.bugs, 'string'

describe 'package.json and bower.json', ->

  [
    'name'
    'version'
    'keywords'
    'license'
    'main'
    'description'
    'repository'
    'homepage'
  ].forEach (key) ->
    it 'have the same ' + key, ->
      assert.deepEqual pkg[key], bower[key]

  it 'have the same authors', ->
    pkgAuthors = [pkg.author].concat(pkg.contributors)
    assert.deepEqual pkgAuthors, bower.authors

  it 'are public', ->
    assert not pkg.private
    assert not bower.private

  it 'have no dependencies', ->
    assert not pkg.dependencies
    assert not bower.dependencies
