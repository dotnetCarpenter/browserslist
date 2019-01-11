var parse = require('./parse')

function log (test) {
  console.log(
    test, `\n`, parse(test)//.map(x => x + '')
  )
}

var test

test = ''
log(test)

test = '  '
log(test)

test = 'l  ol'
log(test)

// test = 'and_chr 55'
// log(test)

// test = 'not ie 9'
// log(test)

// test = 'defaults and ie 6'
// log(test)

// test = '   defaults     and     ie 6   '
// log(test)

// test = '>.5%,last   2 versions'
// log(test)

// test = ' defaults  and ie    6 not    chrome 10, not dead'
// log(test)String

// test = '>Stringrsions, Firefox ESR, not and ,, not or dead'
// log(test)String

// test = 'or dead'
// log(test)

// test = 'last 3 Chrome major versions'
// log(test)

// test = 'last 1 Baidu version and not <2% in AT'
// log(test)

// test = 'last 1 Baidu version not <2% in AT'
// log(test)
String