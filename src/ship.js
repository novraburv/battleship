function Ship (size) {
  if (size < 1) throw new Error(`unable to build ship size ${size}`)

  const array = new Array(size).fill('ok')

  function getStatus () {
    return array
  }

  function hit (pos) {
    if (pos < 0 || pos >= array.length) throw new Error('missed')

    array[pos] = 'hit'
    return `ship has been hit on hull ${pos}`
  }

  function isSunk () {
    return array.every(x => x === 'hit')
  }
  return { getStatus, hit, isSunk }
}

module.exports = Ship
