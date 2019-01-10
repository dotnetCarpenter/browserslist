'use strict'

/** @constant */
var QUERY_OR = 'OR'
/** @constant */
var QUERY_AND = 'AND'
/** @constant */
var QUERY_NOT = 'NOT'

// /** @constant */
// var TOKEN_SPACE = 'SPACE'
/** @constant */
var TOKEN_NONTERMINAL = 'NONTERMINAL'
/** @constant */
var TOKEN_TERMINAL = 'TERMINAL'
/** @constant */
var TOKEN_COMBINATOR = 'COMBINATOR'
/** @constant */
var TOKEN_BOF = 'BOF'

/**
 * @typedef {object} BrowserslistQuery
 * @property {number} type A type constant like QUERY_OR @see QUERY_OR.
 * @property {string} queryString A query like "ie < 11".
 */

/**
 * Parse a browserslist string query
 * @param {string} queries One or more queries as a string
 * @returns {BrowserslistQuery[]} An array of BrowserslistQuery
 */
function parse (queries) {
  queries = queries.trim()

  if (queries === '') return []

  var tokens = lexer(queries)
  // console.log(tokens)
  return parser(tokens)
}

/**
 * Transforms a sequence of characters in a sequence of tokens
 * @param {string} input Query string
 * @returns {object[]} Tokens
 */
function lexer (input) {
  var tokens = Array.prototype.map.call(input, function (char) {
    var t = { v: char, type: TOKEN_TERMINAL }
    switch (char) {
      case ',': t.type = TOKEN_COMBINATOR; break
      case ' ': t.type = TOKEN_NONTERMINAL; break
    }

    return t
  })

  // collapse whitespace
  var max = tokens.length - 1
  tokens = tokens.filter(function (t, i, ts) {
    if (
      t.type === TOKEN_NONTERMINAL &&
      peek(ts, max, i).type === TOKEN_NONTERMINAL) return false

    return true
  })

  // mark COMBINATOR
  var test = ''
  tokens.forEach(function (t, i) {
    if (t.type === TOKEN_TERMINAL) {
      test += t.v
    } else {
      test = ''
    }

    switch (test + peek(tokens, tokens.length - 1, i).v) {
      case 'and ':
      case 'not ':
      case 'or ':
        // debugger
        for (var n = 0, len = test.length - 1; n <= len; n++) {
          tokens[i - len + n].type = TOKEN_COMBINATOR
        }
    }
  })

  // collapse COMBINATORS
  var combinators = []
  tokens = tokens.reduce(function (accu, t) {
    if (t.type === TOKEN_COMBINATOR) combinators.push(t.v)

    var v = combinators.join('')
    switch (v) {
      case 'not':
        accu.push({ v: v, type: TOKEN_COMBINATOR })
        combinators.splice(0)
        break
      case 'and':
        accu.push({ v: v, type: TOKEN_COMBINATOR })
        combinators.splice(0)
        break
      case 'or':
      case ',':
        accu.push({ v: v, type: TOKEN_COMBINATOR })
        combinators.splice(0)
        break
    }

    if (t.type !== TOKEN_COMBINATOR) accu.push(t)

    return accu
  }, [])

  if (tokens[0].type !== TOKEN_COMBINATOR) tokens[0].type = TOKEN_BOF

  return tokens

  function peek (list, m, i) {
    return list[Math.min(i + 1, m)]
  }
}

function parser (tokens) {
  var ast = []
  var parsed = []

  var consuming = true

  for (var i = tokens.length - 1; i >= 0; --i) {
    // debugger
    // var peek = tokens[Math.max(i - 1, 0)]
    var token = tokens[i]

    if (!consuming && token.type === TOKEN_TERMINAL) consuming = true

    if (consuming) parsed.push(token)

    if (consuming && token.type === TOKEN_COMBINATOR) {
      var type
      switch (token.v) {
        case 'not':
          type = QUERY_NOT
          break
        case 'or':
        case ',':
          type = QUERY_OR
          break
        case 'and':
          type = QUERY_AND
          break
      }

      ast.unshift({ type: type, queryString: parsed.slice(0, -1).reverse().reduce(getV, '').trim() })
      consuming = false
      parsed.splice(0)
    }

    // #region old
    // if (lst(parsed) && lst(parsed).type === TOKEN_COMBINATOR) {
    //   var combinator = parsed.filter(isCombi).reverse().reduce(getV, '')
    //   var queryString = parsed.filter(notCombi).reverse().reduce(getV, '')
    //   // debugger
    //   var query

    //   switch (token.toLowerCase()) {
    //     case 'not': query = { type: QUERY_NOT, queryString: queryString.trim() }; break

    //     case 'or':
    //     case ',': query = { type: QUERY_OR, queryString: queryString.trim() }; break

    //     case 'and': query = { type: QUERY_AND, queryString: queryString.trim() }; break
    //   }

    //   ast.push(query)
    //   parsed.splice(0)
    //   query = null
    //   eating = false
    // }
    // #endregion

    if (token.type === TOKEN_BOF) {
      ast.unshift({ type: QUERY_OR, queryString: parsed.slice(0).reverse().reduce(getV, '').trim() })
    }
  }

  return ast
}

function getV (a, t) {
  return a + t.v
}

// function flatten (array) {
//   if (!Array.isArray(array)) return [array]
//   return array.reduce(function (a, b) {
//     return a.concat(flatten(b))
//   }, [])
// }

// function mark (type) {
//   return function (t) {
//     t.type = type
//     return t
//   }
// }

/* eslint no-unused-expressions: "off" */
parse.QUERY_OR = QUERY_OR
parse.QUERY_AND = QUERY_AND
parse.QUERY_NOT = QUERY_NOT

// #region old
// /**
//  * Find query matches in a string. This function is meant to be called
//  * repeatedly with the returned query string until there is no more matches.
//  * @param {string} string A string with one or more queries.
//  * @param {BrowserslistQuery[]} qs Out parameter,
//  * will be filled with `BrowserslistQuery`.
//  * @returns {string} The rest of the query string minus the matched part.
//  */
// function doMatch (string, qs) {
//   var or = /\s?(\b.+)(?:,|\bOR)(?:\s*)(?!not|and)/i
//   var and = /\s*AND\s+(.+)/i
//   var not = /\s*NOT\s+(.*)/i
//   var garbage = /((\bAND|\bOR|\bNOT|,)\s*)(?=(\bAND|\bOR|\bNOT|,))/i

//   return findAndCut(
//     string,
//     function (parsed, n, max) {
//       if (garbage.test(parsed)) { // a combiner without query
//         return true
//       } else if (not.test(parsed)) {
//         qs.push({
//           type: QUERY_NOT,
//           queryString: parsed.match(not)[1].trim()
//         })
//         return true
//       } else if (and.test(parsed)) {
//         qs.push({
//           type: QUERY_AND,
//           queryString: parsed.match(and)[1].trim()
//         })
//         return true
//       } else if (or.test(parsed)) {
//         qs.push({
//           type: QUERY_OR,
//           queryString: parsed.match(or)[1].trim()
//         })
//         return true
//       } else if (n === max) { // no more chars
//         qs.push({
//           type: QUERY_OR,
//           queryString: parsed.trim()
//         })
//         return true
//       }
//       return false
//     }
//   )
// }

// function findAndCut (string, predicate) {
//   for (var n = 1, max = string.length; n <= max; n++) {
//     var parsed = string.substring(0, n)
//     if (predicate(parsed, n, max)) {
//       return string.replace(parsed, '')
//     }
//   }
//   return ''
// }
// #endregion

module.exports = parse
