document.addEventListener('DOMContentLoaded', startGame)

var board = createBoard(6)

function createBoard(size) {
  var board = {
    cells: []
  }
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      board.cells.push({row: i, col: j, isMine: Math.random() < 0.3, isMarked: false, hidden: true})
    }
  }
  return board
}
// Define your `board` object here!
/* var board = {
  cells: [{ 
            row: 0, col: 0, isMine: false, isMarked: false, hidden: true 
          }, 
          { 
            row: 0, col: 1, isMine: false, isMarked: false, hidden: true 
          },
          { 
            row: 0, col: 2, isMine: true, isMarked: false, hidden: true 
          }, 
          { 
            row: 1, col: 0, isMine: false, isMarked: false, hidden: true 
          },
          {
            row: 1, col: 1, isMine: true, isMarked: false, hidden: true
          },
          {
            row: 1, col: 2, isMine: true, isMarked: false, hidden: true
          },
          {
            row: 2, col: 0, isMine: false, isMarked: false, hidden: true
          },
          {
            row: 2, col: 1, isMine: true, isMarked: false, hidden: true
          },
          {
            row: 2, col: 2, isMine: false, isMarked: false, hidden: true
          }]
} */

function startGame () {
  for (var i = 0; i < board.cells.length; i++)
  {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener("click", checkForWin)
  document.addEventListener("auxclick", checkForWin)
  lib.initBoard()
}

function checkForWin () {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      return
    }
  }
  lib.displayMessage("You win!")
}

function countSurroundingMines (cell) {
  var mineCount = 0
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      mineCount += 1
    }
  }
  return mineCount
}