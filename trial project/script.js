document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const gameStatus = document.getElementById("game-status");
    const resetButton = document.getElementById("reset-button");
  
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Represents the 3x3 game board
  
    // Function to check for a win
    const checkWin = () => {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return true;
        }
      }
      return false;
    };
  
    // Function to check for a tie
    const checkTie = () => {
      return !gameBoard.includes("");
    };
  
    // Function to handle cell click
    const handleCellClick = (index) => {
      if (gameBoard[index] === "") {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        
        if (checkWin()) {
          gameStatus.textContent = `Player ${currentPlayer} wins!`;
          disableCellClicks();
        } else if (checkTie()) {
          gameStatus.textContent = "It's a tie!";
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          gameStatus.textContent = `Player ${currentPlayer}'s turn`;
        }
      }
    };
  
    // Function to reset the game
    const resetGame = () => {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      cells.forEach((cell) => {
        cell.textContent = "";
      });
      currentPlayer = "X";
      gameStatus.textContent = `Player ${currentPlayer}'s turn`;
      enableCellClicks();
    };
  
    // Function to disable cell clicks
    const disableCellClicks = () => {
      cells.forEach((cell) => {
        cell.removeEventListener("click", cellClickHandler);
      });
    };
  
    // Function to enable cell clicks
    const enableCellClicks = () => {
      cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
      });
    };
  
    // Event listeners
    resetButton.addEventListener("click", resetGame);
    enableCellClicks();
  });
  