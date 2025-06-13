// Estado inicial del tablero
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let player1Name = "Jugador 1";
let player2Name = "Jugador 2";

// Combinaciones ganadoras
const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // filas
  [0,3,6], [1,4,7], [2,5,8], // columnas
  [0,4,8], [2,4,6]           // diagonales
];

// Dibuja el tablero con celdas clickeables
function setupBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = ""; // limpia el tablero

  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.textContent = cell;

    cellElement.addEventListener("click", () => {
      markCell(index);
      updateBoard();
    });

    boardElement.appendChild(cellElement);
  });
}

// Actualiza el contenido visual del tablero
function updateBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

// Marca una celda si es válida



function markCell(index) {
  if (board[index] === "" && gameActive) {
    board[index] = currentPlayer;
    checkWinner();

    if (gameActive) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateTurnMessage();
    }
  }
}

// Verifica si alguien ganó o si hubo empate
function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      const winnerName = board[a] === "X" ? player1Name : player2Name;
      showMessage(`¡Ganó ${winnerName}!`);
      return;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    showMessage("¡Empate!");
  }
}

// Muestra mensajes en pantalla
function showMessage(msg) {
  document.getElementById("message").textContent = msg;
}

// Cambia el mensaje según el turno
function updateTurnMessage() {
  const msg = currentPlayer === "X"
    ? `Turno de ${player1Name}`
    : `Turno de ${player2Name}`;
  showMessage(msg);
}

// Cuando la página carga
document.addEventListener("DOMContentLoaded", () => {
  setupBoard();
});

// Iniciar el juego con nombres personalizados
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  player1Name = document.getElementById("player1").value;
  player2Name = document.getElementById("player2").value;
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  setupBoard();
  updateTurnMessage();
});

// Botón de reinicio
document.getElementById("resetButton").addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  setupBoard();
  updateTurnMessage();
});
