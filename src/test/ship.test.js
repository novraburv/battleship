import {Ship} from '../ship.js'

describe('test hit() count', () => {
  // assume ship length is 3
  const ship0 = Ship(3)
  beforeEach(() => {
    ship0.hit()
  })
  test('first hit', () => {
    expect(ship0.getHP()).toBe(2)
  })
  test('second hit', () => {
    expect(ship0.getHP()).toBe(1)
  })
  test('last hit', () => {
    expect(ship0.getHP()).toBe(0)
  })
})
