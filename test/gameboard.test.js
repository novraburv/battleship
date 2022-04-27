const Gameboard = require('../src/gameboard')

// Gameboard factory contains
// * board - 2D array of the board
// * battleships - array of ships
// * placeShip(x, y, orientation, length)
// * receiveAttack(x, y)
// * getBoard()
// * getCell(x, y)

describe('test Gameboard factory function', () => {
  describe('test board size', () => {
    const testBoard = Gameboard(10, 7)
    test('test y dimension', () => {
      expect(testBoard.getBoard()).toHaveLength(7)
    })
    test('test x dimension', () => {
      expect(testBoard.getBoard()[0]).toHaveLength(10)
    })
    test('test testBoard filled with empty cell', () => {
      testBoard.getBoard().forEach(x => testBoard.getBoard()[x].forEach(y => {
        expect(testBoard.getBoard()[x][y]).toEqual({
          ship: undefined,
          shipHull: undefined,
          isShot: false
        })
      }))
    })
  })
  describe('test ship placement', () => {
    const testBoard = Gameboard(10, 10)
    // assumptions:
    // * ship sized 4
    test('ship1 placed on 1, 2 horizontally', () => {
      testBoard.placeShip(1, 2, 'H', 4)
      for (let x = 0; x < 4; x++) {
        expect(testBoard.getBoard()[1 + x][2]).toEqual({
          ship: testBoard.battleships[0],
          shipHull: x,
          isShot: false
        })
      }
    })
    test('ship2 placed on 3, 0 vertically, expect failure', () => {
      expect(testBoard.placeShip(3, 0, 'V', 4)).toBe('failed to place ship, cell 3, 2 is reserved')
    })
    test('ship3 placed on 9, 9 horizontally', () => {
      testBoard.placeShip(9, 9, 'H', 4)
      for (let x = 0; x < 4; x++) {
        expect(testBoard.getBoard()[9 - x][9]).toEqual({
          ship: testBoard.battleships[1],
          shipHull: x,
          isShot: false
        })
      }
    })
    test('ship4 placed on 9, 8 vertically', () => {
      testBoard.placeShip(9, 8, 'V', 4)
      for (let y = 0; y < 4; y++) {
        expect(testBoard.getBoard()[9][8 - y]).toEqual({
          ship: testBoard.battleships[2],
          shipHull: y,
          isShot: false
        })
      }
    })
  })
  describe('test receiveAttack', () => {
    const testBoard = Gameboard(10, 10)
    testBoard.placeShip(3, 4, 'V', 4)
    // assumptions:
    // * ship sized 4
    // * ship is positioned on point 3, 4 vertically
    // * disable multiple shot on the same tile
    test("receiveAttack 3, 4 calls ship's hit(0)", () => {
      expect(testBoard.receiveAttack(3, 4)).toBe('hit')
    })
    test("receiveAttack 3, 7 calls ship's hit(3)", () => {
      expect(testBoard.receiveAttack(3, 7)).toBe('hit')
    })
    test('receiveAttack 3, 7 return "already shot"', () => {
      expect(testBoard.receiveAttack(3, 7)).toBe('unable to hit, you already shot this tile')
    })
    test('receiveAttack 5, 9 return "missed"', () => {
      expect(testBoard.receiveAttack(5, 9)).toBe('missed')
    })
  })
  describe('test all ship is sunk', () => {
    const testBoard = Gameboard(10, 10)
    testBoard.placeShip(1, 1, 'H', 1)
    testBoard.placeShip(2, 2, 'H', 2)
    testBoard.placeShip(3, 3, 'H', 3)
    // assumptions:
    // * 3 ships on the board
    test('sunken ships less than owned ships, continue game', () => {
      testBoard.receiveAttack(1, 1)
      testBoard.receiveAttack(2, 2)
      testBoard.receiveAttack(2, 3)
      expect(testBoard.battleships.every(ship => ship.isSunk())).toBe(false)
    })
    test('sunken ships equals to owned ships, game over', () => {
      for (let i = 0; i < 3; i++) {
        testBoard.reciveAttack(3, 3 + i)
      }
      expect(testBoard.battleships.every(ship => ship.isSunk())).toBe(true)
    })
  })
})
