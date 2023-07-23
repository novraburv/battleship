import { Ship } from '../ship.js'

describe('initiating...', () => {
  // assume ship length is 3
  const ship0 = Ship(3)

  describe('check if ship is not sunk before first hit', () => {
    test('first isSunk() test', () => {
      expect(ship0.isSunk()).toBeFalsy()
    })
  })

  describe("check ship's health points after each hit", () => {
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

  describe('check if ship is sunk after last hit', () => {
    test('second isSunk() test', () => {
      expect(ship0.isSunk()).toBeTruthy()
    })
  })
})
