"use client";

import { useState } from "react";
import { CircleAlertIcon as FaDotCircle, X as ImCross } from "lucide-react";

const TicTacToe_Custom = () => {
  const [inputValue, setInputValue] = useState("");
  const [matrixSize, setMatrixSize] = useState(3);
  const [gameState, setGameState] = useState<string[]>([]);
  const [isXTurn, setIsXTurn] = useState(true);

  // Handle matrix size input and initialize game state
  function handleStartGame() {
    const size = parseInt(inputValue);
    if (!isNaN(size) && size > 0) {
      setMatrixSize(size);
      setGameState(Array(size * size).fill(null));
      setInputValue("");
    }
  }

  // Create a 2D matrix of cell
  const matrix = Array.from({ length: matrixSize }, (_, rowIdx) =>
    Array.from(
      { length: matrixSize },
      (_, colIdx) => rowIdx * matrixSize + colIdx
    )
  );

  // Convert 1D game state array to 2D array
  const board2D = [];
  for (let i = 0; i < matrixSize; i++) {
    board2D.push(gameState.slice(i * matrixSize, (i + 1) * matrixSize));
  }

  // Check for a winner
  function checkWinner(board: string[][]): string | null {
    const size = board.length;

    // Check rows
    for (let row of board) {
      if (row.every((cell) => cell && cell === row[0])) return row[0];
    }

    // Check columns
    for (let col = 0; col < size; col++) {
      const column = board.map((row) => row[col]);
      if (column.every((cell) => cell && cell === column[0])) return column[0];
    }

    // Check diagonals
    const mainDiagonal = board.map((row, i) => row[i]);
    const antiDiagonal = board.map((row, i) => row[size - 1 - i]);
    if (mainDiagonal.every((cell) => cell && cell === mainDiagonal[0]))
      return mainDiagonal[0];
    if (antiDiagonal.every((cell) => cell && cell === antiDiagonal[0]))
      return antiDiagonal[0];

    return null;
  }

  const winner = checkWinner(board2D);

  // Handle a cell click
  function handleCellClick(index: number) {
    if (winner || gameState[index]) return;

    const updatedState = [...gameState];
    updatedState[index] = isXTurn ? "X" : "O";
    setGameState(updatedState);
    setIsXTurn(!isXTurn);
  }

  // Reset game
  function resetGame() {
    setMatrixSize(0);
    setInputValue("");
    setGameState([]);
    setIsXTurn(true);
  }

  return (
    <center className="h-full min-w-3/4 flex flex-col items-center">
      <div className="flex justify-center text-2xl font-bold my-2">
        {winner ? (
          <div className="flex items-center justify-center">
            <p className={winner === "O" ? "text-blue-500" : "text-red-500"}>
              The Winner is {winner}
            </p>
            <button
              onClick={resetGame}
              className="m-2 px-2 border-2 border-red-500 text-xl text-white rounded-lg bg-red-400 hover:bg-transparent hover:text-red-400 hover:border-red-400"
            >
              Back
            </button>
          </div>
        ) : (
          <div className="flex items-center ">
            <input
              max="1"
              className="text-foreground border w-10 border-red-500 text-md rounded-lg mr-2 bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <button
              onClick={handleStartGame}
              className="  px-2 border-2 border-red-500 text-lg font-semibold text-foreground rounded-lg bg-red-400 hover:bg-transparent hover:text-red-400 hover:border-red-400"
            >
              add
            </button>
          </div>
        )}
      </div>

      <table>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cellIndex) => (
                <td key={cellIndex} className="p-2 h-10 w-10">
                  <button
                    onClick={() => handleCellClick(cellIndex)}
                    className="h-10 w-10 flex items-center justify-center bg-gray-400 rounded-xl"
                  >
                    {gameState[cellIndex] === "X" ? (
                      <ImCross className="text-red-600" />
                    ) : gameState[cellIndex] === "O" ? (
                      <FaDotCircle className="text-blue-600 font-extrabold text-xl" />
                    ) : null}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </center>
  );
};

export default TicTacToe_Custom;
