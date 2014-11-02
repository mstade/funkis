var fs     = require('fs')
  , path   = require('path')
  , each   = require('../lib/each')
  , funkis = require('../')
  , expect = require('expect.js')

describe('funkis', function() {
  it('should export every function in lib/', function() {
    var names = fs.readdirSync(path.join(__dirname, '../lib'))
      .map(function(file) {
        var module = path.basename(file, '.js')
        expect(funkis).to.have.key(module)
      })
  })
})