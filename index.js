document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton"); // Thêm id
  const title = document.querySelector("h1");
  let currentPlayer = "X";
  let gameActive = false;

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame); // Thêm sự kiện

  function handleCellClick(event) {
    const cell = event.target;

    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;

    cell.classList.add(currentPlayer);

    if (checkWinner()) {
      title.textContent = `Người chơi ${currentPlayer} đã chiến thắng!`;
      const restartMessage = document.createElement("h2");
      restartMessage.textContent = "Bấm chơi lại để bắt đầu lại!";
      title.insertAdjacentElement("afterend", restartMessage);
      gameActive = false;
      return;
    }

    if (checkDraw()) {
      title.textContent = "Chưa có người chiến thắng!";
      const restartMessage = document.createElement("h2");
      restartMessage.textContent = "Bấm chơi lại để bắt đầu lại!";
      title.insertAdjacentElement("afterend", restartMessage);
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    updatePlayerTurn();
  }

  function checkWinner() {
    const winningCombos = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    return winningCombos.some((combo) => {
      const [a, b, c] = combo;
      return (
        cells[a - 1].textContent !== "" &&
        cells[a - 1].textContent === cells[b - 1].textContent &&
        cells[a - 1].textContent === cells[c - 1].textContent
      );
    });
  }

  function checkDraw() {
    return Array.from(cells).every((cell) => cell.textContent !== "");
  }

  function startGame() {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    currentPlayer = "X";
    gameActive = true;
    startButton.textContent = "Bắt đầu";
    title.textContent = "Hãy chiến đấu hết mình!";
    document.textContent("h2").remove();
  }

  function resetGame() {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    currentPlayer = "X";
    gameActive = true;
    startButton.textContent = "Bắt đầu";
    title.textContent = "Hãy chiến đấu hết mình!";
    document.querySelector("h2").remove();
  }

  function updatePlayerTurn() {
    const playerTurn = document.getElementById("playerTurn");
    playerTurn.textContent = `Lượt người chơi : ${currentPlayer}`;
  }
});
