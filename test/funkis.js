var funkis = require('../')
  , expect = require('must')
  , each   = require('../lib/each')
  , path   = require('path')
  , fs     = require('fs')

describe('funkis', function() {
  it('should export every function in lib/', function() {
    var names = fs.readdirSync(path.join(__dirname, '../lib')).map(function(file) {
      if (path.extname(file) === '.js') {
        return path.basename(file, '.js')
      }
    }).filter(function(x) { return !!x })

    each(names, function(name) {
      expect(funkis).to.have.property(name)
    })
  })
})