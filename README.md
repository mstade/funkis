![Funkis](https://raw.githubusercontent.com/mstade/funkis/master/logo.png)

Funkis
======

This library aims to be a fully fledged environment for functional programming in JavaScript. It provides a number of functions common to functional programming, ranging from low-level constructs to high-level abstractions.

Funkis is work in progress, and APIs change quickly while the library is still being developed. Please don't use it for anything, or at least do so at your own risk.

Usage
-----

Get funkis from npm:

```bash
npm install --save funkis
```

Once installed as a dependency, it is possible to use funkis through the kitchen sink object that holds a reference to all funkis functions:

```javascript
var f = require('funkis')

f.and(1, 2, 3) // 3
```

Or, if you'd rather, you can depend on the functions directly:

```javascript
var and = require('funkis/lib/and')

and(1, 2, 3) // 3
```

Further documentation is available in the [online manual], or the [man] folder.

[man]: man
[online manual]: http://madebystade.com/funkis/

Status
------

[![Build Status](http://img.shields.io/travis/mstade/funkis.svg?style=flat-square)](https://travis-ci.org/mstade/funkis)
[![Coverage Status](http://img.shields.io/coveralls/mstade/funkis.svg?style=flat-square)](https://coveralls.io/r/mstade/funkis?branch=master)
