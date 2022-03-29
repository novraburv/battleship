function Ship (size) {
  if (size < 1) throw new Error(`unable to build ship size ${size}`)

  const status = new Array(size).fill('ok')

  return { status }
}

module.exports = Ship
