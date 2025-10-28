"use client";

import { useEffect, useState } from "react";
import { Circle, X } from "lucide-react";
import { UserState } from "@/lib/type";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { fetchAIMove } from "./AiMove";
import XP from "../XP";
import { useUpdateUsersMutation } from "@/Store/firestoreAPI";
import { showXP } from "@/components/XPAmimation";
import { truncate } from "fs";

const TicTacToe_Logic = () => {
  const [inputValue, setInputValue] = useState("3");
  const [matrixSize, setMatrixSize] = useState(0);
  const [gameState, setGameState] = useState<(string | null | number)[]>([]);
  const [isXTurn, setIsXTurn] = useState(false);
  const [opponent, setOpponent] = useState("");
  const [ai, setAi] = useState(false);
  const [draw, setDraw] = useState(false);

  const UserName: UserState = useSelector((state: RootState) => state.User);
  const [updateUsers] = useUpdateUsersMutation();

  //Using XP Module
  const { xp, level, xpToNext, coin, handleMatch } = XP();

  // Handle matrix size input and initialize game state
  function handleStartGame() {
    const size = parseInt(inputValue);
    if (!isNaN(size) && size > 0) {
      setMatrixSize(size);
      setGameState(Array(size * size).fill(null));
      setInputValue("");
    }
  }

  async function handleAiButton() {
    setAi(true);
    setOpponent("AI");

    const size = parseInt(inputValue);
    if (!isNaN(size) && size > 0) {
      const initialState = Array(size * size).fill(null);
      setMatrixSize(size);
      setGameState(initialState);
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

  const winner = checkWinner(board2D as string[][]);

  // Handle a cell click
  const [clickedIndex, setClickedIndex] = useState<number[]>([]);

  function handleCellClick(index: number) {
    if (winner || gameState[index]) return;
    const nullCount = gameState.filter((item) => item === null).length;
    if (nullCount === 1 && clickedIndex.length >= 2) {
      if (winner) return;
      let a = 0;
      let b = 1;
      const c = 2;
      gameState[clickedIndex[a]] = null;
      gameState[clickedIndex[b]] = null;
      gameState[clickedIndex[c]] = null;
      a++;
      b++;
      c + 2;
      setClickedIndex(clickedIndex.slice(-2));
      setDraw(true);
    }

    const i = index;
    setClickedIndex((prev) => [...prev, i]);
    const updatedState = [...gameState];
    updatedState[index] = isXTurn ? "X" : "O";
    setGameState(updatedState);
    setIsXTurn(!isXTurn);
  }

  async function handleAiCell(index: number) {
    if (winner || gameState[index]) return;
    const nullCount = gameState.filter((item) => item === null).length;
    if (nullCount === 1 && clickedIndex.length >= 2) {
      if (winner) return;
      let a = 0;
      let b = 1;
      let c = 2;
      gameState[clickedIndex[a]] = null;
      gameState[clickedIndex[b]] = null;
      gameState[clickedIndex[c]] = null;
      a++;
      b++;
      c++;
      setClickedIndex(clickedIndex.slice(-2));
    }

    const i = index;
    setClickedIndex((prev) => [...prev, i]);

    const aiResponse = await fetchAIMove(gameState as (string | null)[]);
    isXTurn && setGameState(aiResponse);
    const updatedState: (string | number | null)[] = [...gameState];
    updatedState[index] = !isXTurn ? "O" : "X";
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

  // Updating XP
  useEffect(() => {
    if (winner === "O") {
      handleMatch("win");
      showXP("win", 100);
    } else if (winner === "X") {
      handleMatch("lose");
      showXP("lose", 50);
    } else if (draw) {
      showXP("draw", 20);
      handleMatch("draw");
    }
  }, [winner, draw]);
  //setting a data to server
  useEffect(() => {
    if (winner || draw) {
      updateUsers({
        id: UserName.PLayerId,
        data: { level: level, xp: xp, xpToNext: xpToNext, coin: coin },
      });
    }
  }, [winner, draw, xp, level]);

  return (
    <center className="h-full w-full flex flex-col items-center">
      <div className="flex justify-center text-2xl font-bold my-2">
        {winner ? (
          <div className="flex items-center justify-center">
            <p className={winner === "O" ? "text-blue-500" : "text-red-500"}>
              {winner === "O"
                ? UserName.PlayerName
                : winner === "X" && opponent}
              , Wins!
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
                className={`truncate w-[20vw] px-4 py-2 text-sm lg:text-xl md:text-xl  sm:text-base rounded-bl-4xl rounded-tr-4xl font-normal whitespace-nowrap ${
                  !isXTurn ? "bg-blue-500" : "bg-blue-200"
                } text-black`}
              >
                {UserName.PlayerName}
              </div>
              <div
                className={`truncate w-[20vw] px-4 py-2 text-sm lg:text-xl md:text-xl sm:text-base rounded-br-4xl rounded-tl-4xl font-normal whitespace-nowrap ${
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
                <h1 className=" md:w-full lg:w-full w-[40vw] flex-1 bg-transparent outline-none text-lg text-foreground placeholder:text-gray-400">
                  <p className="truncate w-[80%]">{UserName.PlayerName}</p>
                </h1>
              </label>
              <h1>VS</h1>

              <label
                className="flex items-center border border-red-500 rounded-lg w-full sm:w-auto md:w-1/5  px-3 py-2"
                htmlFor="O"
              >
                <Circle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mr-2" />
                <input
                  className=" w-[5vw] flex-1  outline-none text-lg text-foreground placeholder:text-gray-400"
                  type="text"
                  placeholder="Opponent"
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value)}
                />
              </label>
              <h1>/</h1>
              <button
                onClick={() => {
                  setAi(!ai);
                }}
                className={` flex items-center border border-red-500 rounded-lg w-full sm:w-auto px-3 py-2 hover:bg-red-400 ${
                  ai && "bg-red-400"
                }`}
              >
                <Circle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mr-5" />
                <h1 className="md:w-full lg:w-full w-[40vw] flex-1 bg-transparent outline-none text-xl text-foreground placeholder:text-gray-400">
                  Ai
                </h1>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <select
                name="level"
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-transparent border border-red-500 rounded-lg px-4 py-2 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
              >
                <option className="bg-background/80 text-foreground" value="3">
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
                onClick={ai ? handleAiButton : handleStartGame}
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
                          onClick={() =>
                            ai
                              ? handleAiCell(cellIndex)
                              : handleCellClick(cellIndex)
                          }
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
