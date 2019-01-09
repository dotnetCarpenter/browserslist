'use strict'

// Enum values MUST be powers of 2, so combination are safe
/** @constant {number} */
var QUERY_OR = 1
/** @constant {number} */
var QUERY_AND = 2
/** @constant {number} */
var QUERY_NOT = 4

/**
 * @typedef {object} BrowserslistQuery
 * @property {number} type A type constant like QUERY_OR @see QUERY_OR.
 * @property {string} queryString A query like "not ie < 11".
 */

/**
 * Parse a browserslist string query
 * @param {string} queries One or more queries as a string
 * @returns {BrowserslistQuery[]} An array of BrowserslistQuery
 */
function parse (queries) {
  var qs = []

  do {
    queries = doMatch(queries, qs)
  } while (queries)

  return qs
}

/* eslint no-unused-expressions: "off" */
parse.QUERY_OR = QUERY_OR
parse.QUERY_AND = QUERY_AND
parse.QUERY_NOT = QUERY_NOT

/**
 * Find query matches in a string. This function is meant to be called
 * repeatedly with the returned query string until there is no more matches.
 * @param {string} string A string with one or more queries.
 * @param {BrowserslistQuery[]} qs Out parameter,
 * will be filled with `BrowserslistQuery`.
 * @returns {string} The rest of the query string minus the matched part.
 */
function doMatch (string, qs) {
  var or = /\s?(\b.+)(?:,|\bOR)(?:\s*)(?!not|and)/i
  var and = /\s*AND\s+(.+)/i
  var not = /\s*NOT\s+(.*)/i
  var garbage = /((\bAND|\bOR|\bNOT|,)\s*)(?=(\bAND|\bOR|\bNOT|,))/i

  return findAndCut(
    string,
    function (parsed, n, max) {
      if (garbage.test(parsed)) { // a combiner without query
        return true
      } else if (not.test(parsed)) {
        qs.push({
          type: QUERY_NOT,
          queryString: parsed.match(not)[1].trim()
        })
        return true
      } else if (and.test(parsed)) {
        qs.push({
          type: QUERY_AND,
          queryString: parsed.match(and)[1].trim()
        })
        return true
      } else if (or.test(parsed)) {
        qs.push({
          type: QUERY_OR,
          queryString: parsed.match(or)[1].trim()
        })
        return true
      } else if (n === max) { // no more chars
        qs.push({
          type: QUERY_OR,
          queryString: parsed.trim()
        })
        return true
      }
      return false
    }
  )
}

function findAndCut (string, predicate) {
  for (var n = 1, max = string.length; n <= max; n++) {
    var parsed = string.substring(0, n)
    if (predicate(parsed, n, max)) {
      return string.replace(parsed, '')
    }
  }
  return ''
}

module.exports = parse
