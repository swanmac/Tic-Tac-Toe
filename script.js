const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();
// Here we check if the current player one the game//
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
// Here we update our user interface and internal game state to reflect the played move.//    
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
// Here we change the current player and update the game status message to reflect the change.//
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
// We will check wether there are any values in our game state array that are still not populated with a player sign.//
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
// If we get to this point, we know that nobody has won the game yet, and that there are still more moves to be played.//
    handlePlayerChange();
}
// We will accept a ClickEvent from our cell event listener. That will allow us to track which cell has been clicked//
function handleCellClick(clickedCellEvent) {
 //We will save the clicked html element in a variable for easier further use//   
    const clickedCell = clickedCellEvent.target;
//Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where the cell is in our grid. Please note that the getAttribute will return a string value. Sunce we need an actual number we will parse it to a number. //
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
// Here we need to check wether the call has already been played, or if the game is paused. If either is true we ignore the click.//
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
// This resets all of our game tracking variables back to their defaults, clears the game board of all of the "x" and "o" signs, and updates the game status back to the current player message.//
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);