function maybe (v) {
  return v instanceof nothing || null == v ? nothing() : just(v)
}

function just (v) {
  return Object.create(just.prototype, {
    fmap: { value: function (f) { return just(f(v)) } },
    valueOf: { value: function () { return v } }
  })
}

function nothing () {
  return Object.create(nothing.prototype, {
    fmap: { value: function () { return nothing() } },
    valueOf: { value: function () { return null } }
  })
}

// console.log(maybe(20) + 1, maybe() + 1)
// console.log(maybe('hello') + ' world', maybe() + ' world')
// console.log(maybe(true) == true)
// console.log(maybe(true) === true)
// console.log(maybe(false) == false)
// console.log(maybe(false) === false)

const add1 = x => x + 1
// const r = () => Math.random() > .5 ? null : 1
// debugger
// let fx = [maybe(null), maybe(1), maybe(1), maybe()] // nothing, just(1), just(1), nothing
//   .map(functor => functor.fmap(add1)) // all add1 for all just(1)
//   .reduce((a,b) => a + b, 0) // nothing == 0 and just == 2
// console.log(fx) // 4

let chainUntilNull = maybe(1).fmap(add1).fmap(x => null).fmap(add1)
chainUntilNull.fmap(console.log) // 1


chainUntilNull = maybe(1).fmap(add1).fmap(add1)
chainUntilNull.fmap(console.log) // 3

console.log(maybe(null) instanceof nothing) // true

console.log(maybe(1).fmap(add1), maybe(1)) // 2, 1

/**
 * Unwrap nested functors
 * @param {maybe|just|nothing} functor A functor with fmap
 * @returns {maybe} A value wrapped in a functor
 */
function join (functor) {
  var x = null
  functor.fmap(function (v) { x = v })
  return maybe(x instanceof just ? join(x) : x)
}

let x
x = join(nothing())
console.log( x, x.valueOf() ) //<- nothing
x = join(just(nothing()))
console.log( x, x.valueOf() ) //<- nothing
x = join(just(just('X')))
console.log( x, x.valueOf() ) // <- just X
