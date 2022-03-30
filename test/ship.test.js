const Ship = require('../src/ship')

describe('testing Ship factory function', () => {
  describe('ship length', () => {
    function allOK (x) {
      return x === 'ok'
    }
    test('ship length is 4', () => {
      const dummy = Ship(4)
      expect(dummy).toHaveProperty('getStatus')
      expect(dummy.getStatus()).toHaveLength(4)
      expect(dummy.getStatus().every(allOK)).toBe(true)
    })
    test('ship length is 2', () => {
      const dummy = Ship(2)
      expect(dummy).toHaveProperty('getStatus')
      expect(dummy.getStatus()).toHaveLength(2)
      expect(dummy.getStatus().every(allOK)).toBe(true)
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
      expect(dummy.getStatus()).toEqual(['hit', 'ok', 'ok', 'ok'])
    })
    test('ship being hit on 2', () => {
      expect(dummy.hit(2)).toBe('ship has been hit on hull 2')
      expect(dummy.getStatus()).toEqual(['hit', 'ok', 'hit', 'ok'])
    })
    test('ship being hit on -1', () => {
      expect(() => dummy.hit(-1)).toThrow('missed')
    })
    test('ship being hit on 10', () => {
      expect(() => dummy.hit(10)).toThrow('missed')
    })
  })
  describe('ship is sunk', () => {
    let dummy
    beforeAll(() => {
      dummy = Ship(4)
    })
    test('ship have no damage', () => {
      expect(dummy.isSunk()).toBe(false)
    })
    test('ship partially damaged, been hit on hull 1', () => {
      dummy.hit(1)
      expect(dummy.getStatus()).toEqual(['ok', 'hit', 'ok', 'ok'])
      expect(dummy.isSunk()).toBe(false)
    })
    test('ship partially damaged, been hit on hull 3', () => {
      dummy.hit(3)
      expect(dummy.getStatus()).toEqual(['ok', 'hit', 'ok', 'hit'])
      expect(dummy.isSunk()).toBe(false)
    })
    test('ship totally damaged', () => {
      dummy.hit(0)
      dummy.hit(2)
      expect(dummy.getStatus().every(x => x === 'hit')).toBe(true)
      expect(dummy.isSunk()).toBe(true)
    })
  })
})
