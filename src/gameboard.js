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
    if (checkBoundaries(x, y, orientation, length, board)) throw new Error('exceeded boundaries')

    // check obstruction
    if (checkObstruction(x, y, orientation, length, board)) throw new Error('placement obstructed')

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
  function receiveAttack (x, y) {
    if (board[y][x].isShot) return 'unable to hit, you already shot this tile'
    if (board[y][x].shipId === undefined) return 'missed'

    board[y][x].isShot = true
    return 'hit'
  }

  /// /////////////////////
  // SUPPORTING FUNCTIONS
  function generateCell (index, hull) {
    // index means index of ships on 'battleships' array
    return {
      shipId: index,
      shipHull: hull,
      isShot: false
    }
  }
  function checkBoundaries (x, y, orientation, length) {
    return (orientation === 'H' && x + length >= board[0].length) ||
    (orientation === 'V' && y + length >= board.length)
  }
  function checkObstruction (x, y, orientation, length) {
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
    return temp.some(cell => cell.shipId !== undefined)
  }

  /// /////////////////
  // REVEALED FUNCTIONS
  return {
    getBoard,
    getCell,
    getBattleships,
    placeShip,
    receiveAttack
  }
}

module.exports = Gameboard
