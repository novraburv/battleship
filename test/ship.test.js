const ship = require('../src/ship')

describe('testing Ship factory function', () => {
  describe('ship length', () => {
    test.todo('ship length is 4')
    test.todo('ship length is 2')
    test.todo('ship length is 0')
    test.todo('ship length is -1')
  })
  describe('ship being hit', () => {
    // assume ship's length is 4
    // const testShip1 = ship(4)

    test.todo('ship being hit on 0')
    test.todo('ship being hit on 2')
    test.todo('ship being hit on -1')
    test.todo('ship being hit on 10')
  })
  describe('ship is sunk', () => {
    test.todo('ship partially damaged, been hit on 1 point')
    test.todo('ship partially damaged, been hit on 3 point')
    test.todo('ship have no damage')
    test.todo('ship totally damaged')
  })
})
