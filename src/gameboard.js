const Ship = require('./ship')

// Gameboard is a factory function
function Gameboard (x, y) {
  const board = new Array(y).fill(null).map(() => new Array(x).fill(generateCell()))
  const battleships = []

  function getBoard () {
    return board
  }
  function getCell (x, y) {
    return board[y][x]
  }
  function getBattleships () {
    return battleships
  }
  function placeShip (x, y, orientation, length) {
    // check boundaries
    if ((orientation === 'H' && x + length >= board[0].length) ||
    (orientation === 'V' && y + length >= board.length)) throw new Error('exceeded boundaries')

    // check obstruction
    const temp = []
    if (orientation === 'H') {
      for (let i = 0; i < length; i++) {
        temp.push(board[y][x + i])
      }
    }
    if (orientation === 'V') {
      for (let i = 0; i < length; i++) {
        temp.push(board[y + i][x])
      }
    }

    if (temp.some(cell => cell.shipId !== undefined)) throw new Error('placement obstructed')

    // start placing ship
    if (orientation === 'H') {
      for (let i = 0; i < length; i++) {
        board[y][x + i] = generateCell(battleships.length, i)
      }
    }
    if (orientation === 'V') {
      for (let i = 0; i < length; i++) {
        board[y + i][x] = generateCell(battleships.length, i)
      }
    }

    battleships.push(Ship(length))
  }
  function receiveAttack (x, y) {}

  return {
    getBoard,
    getCell,
    getBattleships,
    placeShip,
    receiveAttack
  }
}

module.exports = Gameboard

// index means index of ships on 'battleships' array
function generateCell (index, hull) {
  return {
    shipId: index,
    shipHull: hull,
    isShot: false
  }
}
