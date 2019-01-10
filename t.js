var parse = require('./parse')

// var test = ''
// console.log(
//   test, `\n`, parse(test)
// )

// var test = 'and_chr 55'
// console.log(
//   test, `\n`, parse(test)
// )

// var test = 'not ie 9'
// console.log(
//   test, `\n`, parse(test)
// )

// var test = 'defaults and ie 6'
// console.log(
//   test, `\n`, parse(test)
// )

// var test = '   defaults     and     ie 6   '
// console.log(
//   test, `\n`, parse(test)
// )

var test = ' defaults  and ie    6 not    chrome 10, not dead'
console.log(
  test, `\n`, parse(test)
)

var test = '> 0.5%, last 2 versions, Firefox ESR, not and ,, not or dead'
console.log(
  test, `\n`, parse(test)
)

// var test = 'or dead'
// console.log(
//   test, `\n`, parse(test)
// )

// var test = 'last 3 Chrome major versions'
// console.log(
//   test, `\n`, parse(test)
// )

// var test = 'last 1 Baidu version and not <2% in AT'
// console.log(
//   test, `\n`, parse(test)
// )

// var test = 'last 1 Baidu version not <2% in AT'
// console.log(
//   test, `\n`, parse(test)
// )
