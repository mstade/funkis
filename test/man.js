const expect = require('must')
    , each   = require('../lib/each')
    , path   = require('path')
    , fs     = require('fs')
    , $      = require('../lib/partial')

describe('documentation', function() {
  it('should exist for all functions', function() {
    var names = fs.readdirSync(path.join(__dirname, '../lib')).map(function(file) {
      return path.basename(file, '.js')
    })

    each(names, function(name) {
      try {
        fs.accessSync(__dirname + '/../man/' + name + '.md')
      } catch (e) {
        throw new Error('No documentation for function `' + name + '` found!')
      }
    })
  })
})