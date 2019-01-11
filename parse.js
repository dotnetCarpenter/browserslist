'use strict'

/** @constant */
var QUERY_OR = 1
/** @constant */
var QUERY_AND = 2
/** @constant */
var QUERY_NOT = 4

/** @constant */
var TOKEN_NONTERMINAL = 'NONTERMINAL'
/** @constant */
var TOKEN_TERMINAL = 'TERMINAL'
/** @constant */
var TOKEN_COMBINATOR = 'COMBINATOR'
/** @constant */
var TOKEN_BOQ = 'BOQ'

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

  // if (queries === '') return []

  var tokens = lexer2(queries)
  return tokens
  // console.log(tokens)
  // return parser(tokens)
}

/* ORIGINAL
1. convert string to array
2. mark single char combinators
3. mark non-terminals (only whitespace)
4. collapse whitespace
5. mark multiple char combinators
6. collapse combinator chars to single token
7. set first char as BOQ token
*/

function lexer2 (input, tokens) {
  return tokenize(input[0], input.slice(1), tokens)
}

function tokenize (char, rest, tokens) {
  debugger
  tokens = tokens || []

  if (!char) return tokens

  var t = { v: char || rest, type: TOKEN_TERMINAL }

  switch (char) {
    case ',': t.type = TOKEN_COMBINATOR; break
    case ' ': t.type = TOKEN_NONTERMINAL; break
    case undefined:
    case '': t = null; break
  }

  return rest.length > 0 && rest[0] === ' '
    ? tokenize(rest[0], rest.slice(1))
    : t
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

  if (tokens[0].type !== TOKEN_COMBINATOR) tokens[0].type = TOKEN_BOQ

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

      ast.unshift({ type: type, queryString: parsed.slice(0, -1).reverse().reduce(getValue, '').trim() })
      consuming = false
      parsed.splice(0)
    }

    if (token.type === TOKEN_BOQ) {
      ast.unshift({ type: QUERY_OR, queryString: parsed.slice(0).reverse().reduce(getValue, '').trim() })
    }
  }

  return ast
}

function getValue (a, t) {
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

module.exports = parse
