const checkFile = require('check-ecmascript-version-compatibility')
const path = require('path')

describe('ES5 compatibility', function () {
  it('is ES5-compliant', function (done) {
    this.slow(8000)
    this.timeout(10000)

    const sourcePath = path.join(__dirname, '..', 'humanize-duration.js')
    checkFile(sourcePath, done)
  })
})
