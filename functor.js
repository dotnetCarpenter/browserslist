function maybe (v) {
  return null === v || null == v.valueOf() ? nothing() : just(v)
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
// const add1 = x => x + 1

// const r = () => Math.random() > .5 ? null : 1
// debugger
// let fx = [maybe(null), maybe(1), maybe(1), maybe()]
//   .map(functor => functor.fmap(add1))
//   .reduce((a,b) => a + b, 0)
// console.log(fx)

// let chainUntilNull = maybe(1).fmap(add1).fmap(x => null).fmap(add1)
// chainUntilNull.fmap(console.log)
// chainUntilNull = maybe(1).fmap(add1).fmap(add1)
// chainUntilNull.fmap(console.log)

// console.log(maybe(null) instanceof nothing)

// console.log(maybe(1).fmap(add1), maybe(1))

function join (functor) {
  var x = null
  functor.fmap(function (v) { x = v })
  return maybe(x instanceof just || x instanceof nothing ? join(x) : x)
}

let x
x = join(nothing())
console.log( x, x.valueOf() ) //<- nothing
x = join(just(nothing()))
console.log( x, x.valueOf() ) //<- nothing
x = join(just(just('X')))
console.log( x, x.valueOf() ) // <- just X
