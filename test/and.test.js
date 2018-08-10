var browserslist = require('../')

var originUsage = browserslist.usage

var resultFixture = [
  'and_chr 67',
  'and_uc 11.8',
  'chrome 67',
  'edge 17',
  'firefox 60',
  'ie 11',
  'ios_saf 11.3-11.4',
  'op_mini all',
  'safari 11.1',
  'samsung 6.2'
]

var usageFixture = {
  global: {
    'ie 6': 0.00895953,
    'ie 7': 0.0134393,
    'ie 8': 0.179191,
    'ie 9': 0.161271,
    'ie 10': 0.107514,
    'ie 11': 2.71026,
    'ie 5.5': 0.009298,
    'edge 12': 0.026214,
    'edge 13': 0.026214,
    'edge 14': 0.065535,
    'edge 15': 0.074273,
    'edge 16': 0.48059,
    'edge 17': 1.15342,
    'edge 18': 0,
    'firefox 2': 0.013107,
    'firefox 3': 0.004369,
    'firefox 4': 0.004369,
    'firefox 5': 0.004879,
    'firefox 6': 0.020136,
    'firefox 7': 0.005725,
    'firefox 8': 0.008738,
    'firefox 9': 0.00533,
    'firefox 10': 0.004283,
    'firefox 11': 0.004369,
    'firefox 12': 0.004471,
    'firefox 13': 0.004486,
    'firefox 14': 0.00453,
    'firefox 15': 0.013107,
    'firefox 16': 0.004417,
    'firefox 17': 0.004349,
    'firefox 18': 0.004393,
    'firefox 19': 0.004443,
    'firefox 20': 0.004283,
    'firefox 21': 0.004369,
    'firefox 22': 0.004393,
    'firefox 23': 0.013107,
    'firefox 24': 0.008786,
    'firefox 25': 0.004369,
    'firefox 26': 0.004393,
    'firefox 27': 0.004393,
    'firefox 28': 0.004418,
    'firefox 29': 0.004369,
    'firefox 30': 0.004369,
    'firefox 31': 0.017476,
    'firefox 32': 0.004471,
    'firefox 33': 0.008738,
    'firefox 34': 0.013107,
    'firefox 35': 0.004369,
    'firefox 36': 0.004369,
    'firefox 37': 0.008738,
    'firefox 38': 0.04369,
    'firefox 39': 0.008738,
    'firefox 40': 0.008738,
    'firefox 41': 0.013107,
    'firefox 42': 0.008738,
    'firefox 43': 0.026214,
    'firefox 44': 0.008738,
    'firefox 45': 0.034952,
    'firefox 46': 0.008738,
    'firefox 47': 0.069904,
    'firefox 48': 0.126701,
    'firefox 49': 0.021845,
    'firefox 50': 0.021845,
    'firefox 51': 0.056797,
    'firefox 52': 0.432531,
    'firefox 53': 0.021845,
    'firefox 54': 0.026214,
    'firefox 55': 0.039321,
    'firefox 56': 0.08738,
    'firefox 57': 0.056797,
    'firefox 58': 0.048059,
    'firefox 59': 0.148546,
    'firefox 60': 3.23743,
    'firefox 61': 0.21845,
    'firefox 62': 0.013107,
    'firefox 63': 0,
    'firefox 3.5': 0.008786,
    'firefox 3.6': 0.008738,
    'chrome 4': 0.004706,
    'chrome 5': 0.004879,
    'chrome 6': 0.004879,
    'chrome 7': 0.005591,
    'chrome 8': 0.005591,
    'chrome 9': 0.005591,
    'chrome 10': 0.004534,
    'chrome 11': 0.008738,
    'chrome 12': 0.004283,
    'chrome 13': 0.004879,
    'chrome 14': 0.004706,
    'chrome 15': 0.009154,
    'chrome 16': 0.004393,
    'chrome 17': 0.004393,
    'chrome 18': 0.013107,
    'chrome 19': 0.004418,
    'chrome 20': 0.004393,
    'chrome 21': 0.004369,
    'chrome 22': 0.017476,
    'chrome 23': 0.008786,
    'chrome 24': 0.026214,
    'chrome 25': 0.013107,
    'chrome 26': 0.008738,
    'chrome 27': 0.004369,
    'chrome 28': 0.008738,
    'chrome 29': 0.196605,
    'chrome 30': 0.017476,
    'chrome 31': 0.026214,
    'chrome 32': 0.008738,
    'chrome 33': 0.013107,
    'chrome 34': 0.021845,
    'chrome 35': 0.026214,
    'chrome 36': 0.017476,
    'chrome 37': 0.017476,
    'chrome 38': 0.030583,
    'chrome 39': 0.013107,
    'chrome 40': 0.017476,
    'chrome 41': 0.017476,
    'chrome 42': 0.026214,
    'chrome 43': 0.061166,
    'chrome 44': 0.008738,
    'chrome 45': 0.017476,
    'chrome 46': 0.017476,
    'chrome 47': 0.030583,
    'chrome 48': 0.039321,
    'chrome 49': 0.712147,
    'chrome 50': 0.026214,
    'chrome 51': 0.04369,
    'chrome 52': 0.048059,
    'chrome 53': 0.026214,
    'chrome 54': 0.074273,
    'chrome 55': 0.336413,
    'chrome 56': 0.104856,
    'chrome 57': 0.074273,
    'chrome 58': 0.113594,
    'chrome 59': 0.056797,
    'chrome 60': 0.08738,
    'chrome 61': 0.100487,
    'chrome 62': 0.144177,
    'chrome 63': 0.432531,
    'chrome 64': 0.227188,
    'chrome 65': 0.4369,
    'chrome 66': 9.00451,
    'chrome 67': 15.4925,
    'chrome 68': 0.061166,
    'chrome 69': 0.030583,
    'chrome 70': 0,
    'safari 4': 0,
    'safari 5': 0.013107,
    'safari 6': 0.004349,
    'safari 7': 0.008738,
    'safari 8': 0.039321,
    'safari 9': 0.04369,
    'safari 10': 0.069904,
    'safari 11': 0.288354,
    'safari 12': 0.004369,
    'safari 3.1': 0,
    'safari 3.2': 0.008692,
    'safari 5.1': 0.065535,
    'safari 6.1': 0.013107,
    'safari 7.1': 0.004283,
    'safari 9.1': 0.135439,
    'safari 10.1': 0.244664,
    'safari 11.1': 1.38497,
    'safari TP': 0,
    'opera 9': 0.0082,
    'opera 11': 0.016581,
    'opera 12': 0.004369,
    'opera 15': 0.00685,
    'opera 16': 0.00685,
    'opera 17': 0.00685,
    'opera 18': 0.005014,
    'opera 19': 0.006015,
    'opera 20': 0.004879,
    'opera 21': 0.006597,
    'opera 22': 0.006597,
    'opera 23': 0.013434,
    'opera 24': 0.006702,
    'opera 25': 0.006015,
    'opera 26': 0.005595,
    'opera 27': 0.004393,
    'opera 28': 0.004369,
    'opera 29': 0.004879,
    'opera 30': 0.004879,
    'opera 31': 0.008738,
    'opera 32': 0.005152,
    'opera 33': 0.005014,
    'opera 34': 0.009758,
    'opera 35': 0.004879,
    'opera 36': 0.026214,
    'opera 37': 0.004283,
    'opera 38': 0.004367,
    'opera 39': 0.004534,
    'opera 40': 0.004367,
    'opera 41': 0.004227,
    'opera 42': 0.004418,
    'opera 43': 0.008668,
    'opera 44': 0.004227,
    'opera 45': 0.004471,
    'opera 46': 0.004417,
    'opera 47': 0.008942,
    'opera 48': 0.004369,
    'opera 49': 0.008738,
    'opera 50': 0.004369,
    'opera 51': 0.004369,
    'opera 52': 0.026214,
    'opera 53': 0.843217,
    'opera 12.1': 0.034952,
    'opera 9.5-9.6': 0.00685,
    'opera 10.0-10.1': 0.008738,
    'opera 10.5': 0.008392,
    'opera 10.6': 0.004706,
    'opera 11.1': 0.006229,
    'opera 11.5': 0.004879,
    'opera 11.6': 0.008786,
    'ios_saf 8': 0.0116667,
    'ios_saf 12': 0.0291667,
    'ios_saf 3.2': 0.000972222,
    'ios_saf 4.0-4.1': 0,
    'ios_saf 4.2-4.3': 0.00194444,
    'ios_saf 5.0-5.1': 0.0145833,
    'ios_saf 6.0-6.1': 0.00777778,
    'ios_saf 7.0-7.1': 0.0408333,
    'ios_saf 8.1-8.4': 0.06125,
    'ios_saf 9.0-9.2': 0.0466667,
    'ios_saf 9.3': 0.279028,
    'ios_saf 10.0-10.2': 0.30625,
    'ios_saf 10.3': 0.701945,
    'ios_saf 11.0-11.2': 1.57597,
    'ios_saf 11.3-11.4': 6.63542,
    'op_mini all': 2.42564,
    'android 3': 0,
    'android 4': 0,
    'android 67': 0,
    'android 2.1': 0,
    'android 2.2': 0,
    'android 2.3': 0,
    'android 4.1': 0.0683595,
    'android 4.2-4.3': 0.156,
    'android 4.4': 0.578426,
    'android 4.4.3-4.4.4': 0.362831,
    'bb 7': 0.0090096,
    'bb 10': 0.0360384,
    'op_mob 10': 0,
    'op_mob 11': 0,
    'op_mob 12': 0,
    'op_mob 46': 0.0111391,
    'op_mob 12.1': 0,
    'op_mob 11.1': 0,
    'op_mob 11.5': 0,
    'and_chr 67': 31.6889,
    'and_ff 60': 0.16893,
    'ie_mob 10': 0.0232279,
    'ie_mob 11': 0.162595,
    'and_uc 11.8': 7.53991,
    'samsung 4': 0.830777,
    'samsung 5': 0.166155,
    'samsung 6.2': 1.12155,
    'samsung 7.2': 0,
    'and_qq 1.2': 0,
    'baidu 7.12': 0
  }
}

beforeEach(() => {
  browserslist.usage = usageFixture
})
afterEach(() => {
  browserslist.usage = originUsage
})

it('query composition with AND operator', () => {
  // old behavior
  expect(
    browserslist('> 1%, not IE < 11, not Chrome < 67, not iOS < 11.4')
  ).toEqual(resultFixture)

  // new behavior
  expect(
    browserslist('last 1 version and not IE > 11 and > 1%')
  ).toEqual(resultFixture)
})
