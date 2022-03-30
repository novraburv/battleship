const Ship = require('../src/ship')

describe('testing Ship factory function', () => {
  describe('ship length', () => {
    function allOK (x) {
      return x === 'ok'
    }
    test('ship length is 4', () => {
      const dummy = Ship(4)
      expect(dummy).toHaveProperty('status')
      expect(dummy.status()).toHaveLength(4)
      expect(dummy.status().every(allOK)).toBe(true)
    })
    test('ship length is 2', () => {
      const dummy = Ship(2)
      expect(dummy).toHaveProperty('status')
      expect(dummy.status()).toHaveLength(2)
      expect(dummy.status().every(allOK)).toBe(true)
    })
    test('ship length is 0', () => {
      expect(() => Ship(0)).toThrow('unable to build ship size 0')
    })
    test('ship length is -1', () => {
      expect(() => Ship(-1)).toThrow('unable to build ship size -1')
    })
  })
  describe('ship being hit', () => {
    let dummy
    beforeAll(() => {
      // assume ship's length is 4
      dummy = Ship(4)
    })
    test('ship being hit on 0', () => {
      expect(dummy.hit(0)).toBe('ship has been hit on hull 0')
      expect(dummy.status()).toEqual(['hit', 'ok', 'ok', 'ok'])
    })
    test('ship being hit on 2', () => {
      expect(dummy.hit(2)).toBe('ship has been hit on hull 2')
      expect(dummy.status()).toEqual(['hit', 'ok', 'hit', 'ok'])
    })
    test('ship being hit on -1', () => {
      expect(() => dummy.hit(-1)).toThrow('missed')
    })
    test('ship being hit on 10', () => {
      expect(() => dummy.hit(10)).toThrow('missed')
    })
  })
  describe('ship is sunk', () => {
    test.todo('ship partially damaged, been hit on hull 1')
    test.todo('ship partially damaged, been hit on hull 3')
    test.todo('ship have no damage')
    test.todo('ship totally damaged')
  })
})
