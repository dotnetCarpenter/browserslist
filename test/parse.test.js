var parse = require('../parse')

it('can parse single browser query', () => {
  var expected = [{ type: parse.QUERY_OR, queryString: 'ie 6' }]
  var actual = parse('ie 6')

  expect(actual).toEqual(expected)
})

it('can parse single version query', () => {
  var expected = [
    {
      type: parse.QUERY_OR,
      queryString: 'last 3 Chrome major versions'
    }
  ]
  var actual = parse('last 3 Chrome major versions')

  expect(actual).toEqual(expected)
})

it('can parse two OR queries', () => {
  var expected = [
    { type: parse.QUERY_OR, queryString: 'defaults' },
    { type: parse.QUERY_OR, queryString: 'ie 6' }
  ]
  var actual = parse('defaults or ie 6')

  expect(actual).toEqual(expected)
})

it('can parse two "," queries', () => {
  var expected = [
    { type: parse.QUERY_OR, queryString: 'defaults' },
    { type: parse.QUERY_OR, queryString: 'ie 6' }
  ]
  var actual = parse('defaults, ie 6')

  expect(actual).toEqual(expected)
})

it('can parse two AND queries', () => {
  var expected = [
    { type: parse.QUERY_OR, queryString: 'defaults' },
    { type: parse.QUERY_AND, queryString: 'ie 6' }
  ]
  var actual = parse('defaults and ie 6')

  expect(actual).toEqual(expected)
})

it('can parse a query with extra whitespace', () => {
  var expected = [
    { type: 'OR', queryString: 'defaults' },
    { type: 'AND', queryString: 'ie 6' },
    { type: 'NOT', queryString: 'chrome 10' },
    { type: 'NOT', queryString: 'dead' }
  ]
  var actual = parse(' defaults  and ie    6 not    chrome 10, not dead')

  expect(actual).toEqual(expected)
})

it('can throw meaningfull error messages', () => {
  var str = '> 0.5%, last 2 versions, Firefox ESR, not and ,, not or dead'
  var expected = [
    { type: 'OR', queryString: '> 0.5%' },
    { type: 'OR', queryString: 'last 2 versions' },
    { type: 'OR', queryString: 'Firefox ESR' },
    { type: 'OR', queryString: 'dead' }
  ]
  var actual = parse(str)

  expect(actual).toEqual(expected)
})
