"use client";

import { useState } from "react";
import { Circle, X } from "lucide-react";

const TicTacToe_Logic = () => {
  const [inputValue, setInputValue] = useState("3");
  const [matrixSize, setMatrixSize] = useState(0);
  const [gameState, setGameState] = useState<string[] | any[]>([]);
  const [isXTurn, setIsXTurn] = useState(true);
  const [opponent, setOpponent] = useState("");
  const [user, setUser] = useState("Khubab");

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
    for (const row of board) {
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
  const [clickedIndex, setClickedIndex] = useState<number[]>([]);

  function handleCellClick(index: number) {
    if (winner || gameState[index]) return;
    const nullCount = gameState.filter((item) => item === null).length;
    if (nullCount === 1 && clickedIndex.length >= 2) {
      if (winner) return;
      let a = 0;
      let b = 1;
      let c = 1;
      gameState[clickedIndex[a]] = null;
      gameState[clickedIndex[b]] = null;
      gameState[clickedIndex[c]] = null;
      a++;
      b++;
      setClickedIndex(clickedIndex.slice(-2));
    }

    let i = index;
    setClickedIndex((prev) => [...prev, i]);
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
    setClickedIndex([]);
  }
  console.log(matrix);

  return (
    <center className="h-full w-full flex flex-col items-center">
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
        ) : matrixSize ? (
          <div className="mb-5 w-full max-w-[60vw] px-2 overflow-x-auto">
            <div className="flex justify-between gap-5">
              <div
                className={`w-[20vw] px-4 py-2 text-sm lg:text-xl md:text-xl  sm:text-base rounded-bl-4xl rounded-tr-4xl font-normal whitespace-nowrap ${
                  !isXTurn ? "bg-blue-500" : "bg-blue-200"
                } text-black`}
              >
                {user}
              </div>
              <div
                className={`w-[20vw] px-4 py-2 text-sm lg:text-xl md:text-xl sm:text-base rounded-br-4xl rounded-tl-4xl font-normal whitespace-nowrap ${
                  isXTurn ? "bg-red-500" : "bg-red-200"
                } text-black`}
              >
                {opponent}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-[70vw] px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5 w-full">
              <label
                className=" flex items-center border border-red-500 rounded-lg w-full sm:w-auto px-3 py-2"
                htmlFor="X"
              >
                <X className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 mr-2" />
                <input
                  className="md:w-full lg:w-full w-[40vw] flex-1 bg-transparent outline-none text-lg text-foreground placeholder:text-gray-400"
                  type="text"
                  placeholder="Enter Your Name"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </label>

              <label
                className="flex items-center border border-red-500 rounded-lg w-full sm:w-auto px-3 py-2"
                htmlFor="O"
              >
                <Circle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mr-2" />
                <input
                  className="md:w-full lg:w-full w-[30vw] flex-1  outline-none text-lg text-foreground placeholder:text-gray-400"
                  type="text"
                  placeholder="Opponent"
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value)}
                />
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <select
                name="level"
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-transparent border border-red-500 rounded-lg px-4 py-2 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
              >
                <option
                  className="bg-background/80 text-foreground"
                  value="3"
                  selected
                >
                  Easy
                </option>
                <option className="bg-background/80 text-foreground" value="6">
                  Medium
                </option>
                <option className="bg-background/80 text-foreground" value="9">
                  Hard
                </option>
              </select>

              <button
                onClick={handleStartGame}
                className="px-4 py-2 border-2 border-red-500 text-lg font-semibold text-foreground rounded-lg bg-red-400 hover:bg-transparent hover:text-red-400 hover:border-red-400 transition-all"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full ">
        <div className="">
          <table className="border-collapse">
            <tbody className="">
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cellIndex) => (
                    <td key={cellIndex} className="p-[2px]">
                      <div className="aspect-square w-[8vw]  md:w-[5vw] lg:w-[3vw]">
                        <button
                          onClick={() => handleCellClick(cellIndex)}
                          className="w-full h-full flex items-center justify-center bg-gray-400 rounded-sm lg:rounded-xl md:rounded-xl sm:rounded-xl"
                        >
                          {gameState[cellIndex] === "X" ? (
                            <X className="text-red-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                          ) : gameState[cellIndex] === "O" ? (
                            <Circle className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                          ) : null}
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </center>
  );
};

export default TicTacToe_Logic;
