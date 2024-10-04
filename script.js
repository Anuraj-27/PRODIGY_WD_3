// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== '' || !isGameActive) {
        return; // Cell already filled or game is over
    }

    boardState[cellIndex] = currentPlayer; // Update board state
    cell.textContent = currentPlayer; // Update UI

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue; // Skip if any cell is empty
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true; // A player has won
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false; // Stop the game
        return;
    }

    if (!boardState.includes('')) {
        statusText.textContent = "It's a draw!";
        isGameActive = false; // Stop the game
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
}

function restartGame() {
    isGameActive = true; 
    currentPlayer = 'X'; 
    boardState = ['', '', '', '', '', '', '', '', ''];
    
    cells.forEach(cell => {
        cell.textContent = ''; // Clear UI
        cell.style.pointerEvents = 'auto'; // Enable clicking again
        statusText.textContent = ''; // Clear status message
   });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);