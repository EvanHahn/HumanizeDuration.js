pkg = require '../package.json'
bower = require '../bower.json'

{ expect } = require 'chai'

describe 'package.json', ->

  it 'has `bugs`', ->
    expect(pkg.bugs).to.be.a 'string'

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
      expect(pkg[key]).to.deep.equal bower[key]

  it 'have the same authors', ->
    pkgAuthors = [pkg.author].concat(pkg.contributors)
    expect(pkgAuthors).to.deep.equal bower.authors

  it 'are public', ->
    expect(pkg.private).to.be.falsy
    expect(bower.private).to.be.falsy
