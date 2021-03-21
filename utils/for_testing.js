const palindrome = (string) => {
  if (typeof string === 'undefined') return ''
  return string
    .split('')
    .reverse()
    .join('')
}

const average = array => {
  let sum = 0
  array.forEach(num => { sum += num })
  return sum / array.leght
}

module.exports = {
  palindrome,
  average
}
