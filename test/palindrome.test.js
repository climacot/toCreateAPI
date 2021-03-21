const { palindrome } = require('../utils/for_testing.js')

test.skip('palindrome climaco', () => {
  const result = palindrome('climaco')
  expect(result).toBe('ocamilc')
})

test.skip('palindrome of empty string', () => {
  const result = palindrome('')
  expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
  const result = palindrome()
  expect(result).toBeUndefine()
})
