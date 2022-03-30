const Ship = require('../src/ship')

describe('testing Ship factory function', () => {
  describe('ship length', () => {
    function allOK (x) {
      return x === 'ok'
    }
    test('ship length is 4', () => {
      const testShip = Ship(4)
      expect(testShip).toHaveProperty('status')
      expect(testShip.status()).toHaveLength(4)
      expect(testShip.status().every(allOK)).toBe(true)
    })
    test('ship length is 2', () => {
      const testShip = Ship(2)
      expect(testShip).toHaveProperty('status')
      expect(testShip.status()).toHaveLength(2)
      expect(testShip.status().every(allOK)).toBe(true)
    })
    test('ship length is 0', () => {
      expect(() => Ship(0)).toThrow('unable to build ship size 0')
    })
    test('ship length is -1', () => {
      expect(() => Ship(-1)).toThrow('unable to build ship size -1')
    })
  })
  describe('ship being hit', () => {
    let testShip
    beforeAll(() => {
      // assume ship's length is 4
      testShip = Ship(4)
    })
    test('ship being hit on 0', () => {
      expect(testShip.hit(0)).toBe('ship has been hit on hull 0')
      expect(testShip.status()).toEqual(['hit', 'ok', 'ok', 'ok'])
    })
    test('ship being hit on 2', () => {
      expect(testShip.hit(2)).toBe('ship has been hit on hull 2')
      expect(testShip.status()).toEqual(['hit', 'ok', 'hit', 'ok'])
    })
    test('ship being hit on -1', () => {
      expect(() => testShip.hit(-1)).toThrow('missed')
    })
    test('ship being hit on 10', () => {
      expect(() => testShip.hit(10)).toThrow('missed')
    })
  })
  describe('ship is sunk', () => {
    test.todo('ship partially damaged, been hit on 1 point')
    test.todo('ship partially damaged, been hit on 3 point')
    test.todo('ship have no damage')
    test.todo('ship totally damaged')
  })
})
