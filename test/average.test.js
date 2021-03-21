const { average } = require('../utils/for_testing.js')

describe.skip('average', () => {
  test('test average', () => {
    expect(average([1])).toBe(1)
  })
})
