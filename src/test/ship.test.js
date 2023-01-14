// const ship = require('../ship.js')

describe('test hit() count', () => {
  // assume ship length is 3
  const ship0 = {}
  beforeEach(() => {
    ship0.hit()
  })
  test.todo('first hit', () => {
    expect(ship0.getHP()).toBe(2)
  })
  test.todo('second hit', () => {
    expect(ship0.getHP()).toBe(1)
  })
  test.todo('last hit', () => {
    expect(ship0.getHP()).toBe(0)
  })
})
