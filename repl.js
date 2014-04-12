;(function() {
  const global = this
      , libdir = __dirname + '/lib'
      , fs     = require('fs')

  global['reload'] = function() {
    Object.keys(require.cache)
      .forEach(function(k) {
        delete require.cache[k]
      })

    fs.readdirSync(libdir)
      .forEach(function(lib) {
        lib = lib.replace(/\.js$/, '')
        global[lib] = require(libdir + '/' + lib)
      })
  }

  reload()
}())