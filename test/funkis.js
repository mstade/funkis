var fs     = require('fs')
  , path   = require('path')
  , each   = require('../lib/each')
  , funkis = require('../')
  , expect = require('chai').expect

describe('funkis', function() {
  it('should export every function in lib/', function() {
    var names = fs.readdirSync(path.join(__dirname, '../lib')).map(function(file) {
      return path.basename(file, '.js')
    })

    expect(funkis).to.have.keys(names)
  })
})