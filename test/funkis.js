var fs     = require('fs')
  , path   = require('path')
  , each   = require('../lib/each')
  , funkis = require('../')
  , expect = require('must')

describe('funkis', function() {
  it('should export every function in lib/', function() {
    var names = fs.readdirSync(path.join(__dirname, '../lib')).map(function(file) {
      return path.basename(file, '.js')
    })

    each(names, function(name) {
      expect(funkis).to.have.property(name)
    })
  })
})