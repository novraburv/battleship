function Gameboard (x, y) {
  const board = new Array(y).fill(new Array(x).fill())

  function getBoard () {
    return board
  }
  return { getBoard }
}

describe('test Gameboard factory function', () => {
  describe('test board size', () => {
    const testBoard = Gameboard(10, 7)
    test('test y dimension', () => {
      expect(testBoard.getBoard()).toHaveLength(7)
    })
    test('test x dimension', () => {
      expect(testBoard.getBoard()[0]).toHaveLength(10)
    })
  })
  describe('test ship placement', () => {
    // assumptions:
    // * ship sized 4
    test.todo('ship1 placed on 1, 2 horizontally')
    test.todo('ship2 placed on 3, 0 vertically, expect failure')
    test.todo('ship3 placed on 9, 9 horizontally')
    test.todo('ship4 placed on 9, 8 vertically')
  })
  describe('test receiveAttack', () => {
    // assumptions:
    // * ship sized 4
    // * ship is positioned on point 3, 4 vertically
    // * disable multiple shot on the same tile
    test.todo("receiveAttack 3, 4 calls ship's hit(0)")
    test.todo("receiveAttack 3, 7 calls ship's hit(3)")
    test.todo('receiveAttack 3, 7 return "already shot"')
    test.todo('receiveAttack 5, 9 return "missed"')
  })
  describe('test all ship is sunk', () => {
    // assumptions:
    // * 3 ships on the board
    test.todo('sunken ships less than owned ships, continue game')
    test.todo('sunken ships equals to owned ships, game over')
  })
})
