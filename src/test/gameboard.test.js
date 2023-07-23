// import {GameBoard} from "../gameboard.js"

// dependencies
import { Ship } from '../ship.js'
jest.mock('../ship.js', () => ({
  __esModule: true,
  Ship: jest.fn((size) => ({
    getHP: jest.fn(() => size),
    isSunk: jest.fn(() => false)
  }))
}))

describe('test produced gameboard', () => {
  const newBoard = {} // GameBoard(5)

  test('test gameboard dimension', () => {
    expect(newBoard.getBoard().length === 5 && newBoard.getBoard()[0].length === 5).toBeTruthy()
  })
  test('test each gamboard cell is empty', () => {
    newBoard.every((y) => {
      return y.every((x) => {
        return x.ship === null && x.isShot === false
      }).toBeTruthy()
    })
  })
})

describe('test ship placement', () => {
  const newBoard = {} // GameBoard(5)
  const floatingShips = []
  for (let i = 0; i < 4; i++) {
    floatingShips.push(Ship(3))
  }

  test('place a size 3 ship horizonally on [2, 0] returns success', () => {
    expect(newBoard.placeShip(2, 0, 'h', floatingShips[0])).toBe('success')
  })
  test('place a size 3 ship vertically on [2, 1] returns success', () => {
    expect(newBoard.placeShip(2, 1, 'v', floatingShips[1])).toBe('success')
  })
  test('place a size 3 ship horizontally on [1, 3], because it will collide another ship, returns failure', () => {
    expect(() => { newBoard.placeShip(1, 3, 'h', floatingShips[2]) }).toThrow(Error)
  })
  test('place a size 3 ship vertically on [3, 3], because it will pass the boundaries, returns failure', () => {
    expect(() => { newBoard.placeShip(3, 3, 'v', floatingShips[3]) }).toThrow(Error)
  })
  test('test the board how it supposed to be', () => {
    expect(newBoard.getBoard()).toEqual([
      [{ ship: null, isShot: false }, { ship: null, isShot: false }, { ship: floatingShips[0], isShot: false }, { ship: floatingShips[0], isShot: false }, { ship: floatingShips[0], isShot: false }],
      [{ ship: null, isShot: false }, { ship: null, isShot: false }, { ship: floatingShips[1], isShot: false }, { ship: null, isShot: false }, { ship: null, isShot: false }],
      [{ ship: null, isShot: false }, { ship: null, isShot: false }, { ship: floatingShips[1], isShot: false }, { ship: null, isShot: false }, { ship: null, isShot: false }],
      [{ ship: null, isShot: false }, { ship: null, isShot: false }, { ship: floatingShips[1], isShot: false }, { ship: null, isShot: false }, { ship: null, isShot: false }],
      [{ ship: null, isShot: false }, { ship: null, isShot: false }, { ship: null, isShot: false }, { ship: null, isShot: false }, { ship: null, isShot: false }]
    ])
  })
})

describe('test receiveAttack function', () => {
  const newBoard = {} // GameBoard(5)
  newBoard.placeShip(0, 0, 'h', Ship(3))
  test('attack and hit a ship', () => {
    expect(newBoard.receiveAttack(0, 0)).toBe('hit')
    expect(newBoard[0][0].isShot).toBeTruthy()
  })
  test('attack and miss', () => {
    expect(newBoard.receiveAttack(0, 1)).toBe('missed')
    expect(newBoard[0][1].isShot).toBeTruthy()
  })
})

describe('test if all ships are sunk', () => {
  const newBoard = {} // GameBoard(5)
  const floatingShips = []

  for (let i = 0; i < 3; i++) {
    floatingShips.push(Ship(1))
    newBoard.placeShip(0, i, 'h', floatingShips[i])
  }

  test('first test, before start', () => {
    expect(floatingShips.every(ship => ship.isSunk())).toBeFalsy()
  })
  test('second test, after sinking a ship', () => {
    floatingShips[0].isSunk.mockReturnValue(true)
    expect(floatingShips.every(ship => ship.isSunk())).toBeFalsy()
  })
  test('last test, after sinking all ships', () => {
    floatingShips[1].isSunk.mockReturnValue(true)
    floatingShips[2].isSunk.mockReturnValue(true)
    expect(floatingShips.every(ship => ship.isSunk())).toBeTruthy()
  })
})
