"use client";

import { UserState } from "@/lib/type";
import { useUpdateUsersMutation } from "@/Store/firestoreAPI";
import { RootState } from "@/Store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import XP from "../XP";

type CardType = {
  id: number;
  numbers: number;
  isFliped: boolean;
};

const MemoryGame_Logic: React.FC = () => {
  const [inputSize, setInputSize] = useState<string>("easy");
  const [size, setSize] = useState<number>(0);
  const [CARDS, SetCARDS] = useState<CardType[]>([]);
  const [isLock, setIsLock] = useState<boolean>(false);
  const [flipCard, setFlipCard] = useState<number[]>([]);
  const [winner, setWinner] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  // Fetching Data
  const UserName: UserState = useSelector((state: RootState) => state.User);
  const [updateUsers] = useUpdateUsersMutation();

  const { xp, level, xpToNext, coin, handleMatch } = XP();
  //Stop Watch
  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10); // update every 10ms
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10); // 2-digit ms
    return `${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(
      2,
      "0"
    )}`;
  };
  //Level Handling
  function handleSizeButton(): void {
    inputSize === "easy"
      ? setSize(8)
      : inputSize === "medium"
      ? setSize(12)
      : inputSize === "hard" && setSize(16);
    setTime(0);
    setIsRunning(true);
    setWinner(false);
  }
  useEffect(() => {
    if (winner) {
      setIsRunning(false);
    }
  }, [winner]);

  //sizw of Game_Grid

  const gridGeneration = React.useCallback((): CardType[] => {
    const gridSize = Array.from({ length: size }, (_, index) => index + 1);
    const Grids = [...gridSize, ...gridSize].sort(() => Math.random() - 0.5);
    const Card = Grids.map((grid, index) => {
      return { id: index, numbers: grid, isFliped: false };
    });
    return Card;
  }, [size]);

  function handleFliped(index: number): void {
    if (CARDS[index].isFliped || isLock) {
      return;
    }

    const copyCards = [...CARDS];
    copyCards[index].isFliped = true;
    SetCARDS(copyCards);
    setFlipCard([...flipCard, index]);
  }

  useEffect(() => {
    if (flipCard.length === 2) {
      const [first, second] = flipCard;
      setIsLock(true);

      setTimeout(() => {
        const updatedCards = [...CARDS];
        if (CARDS[first].numbers !== CARDS[second].numbers) {
          updatedCards[first].isFliped = false;
          updatedCards[second].isFliped = false;
        }
        SetCARDS(updatedCards);
        setFlipCard([]);
        setIsLock(false);
      }, 500);
    }
  }, [flipCard, CARDS]);

  useEffect(() => {
    if (CARDS.every((cards) => cards.isFliped)) {
      setWinner(true);
    }
  }, [CARDS]);

  useEffect(() => {
    if (size > 0) {
      SetCARDS(gridGeneration());
    }
  }, [size, gridGeneration]);

  // Updating XP
  useEffect(() => {
    if (winner) {
      handleMatch("win");
    }
  }, [winner]);

  //setting a data to server
  useEffect(() => {
    if (winner) {
      updateUsers({
        id: UserName.PLayerId,
        data: { level: level, xp: xp, xpToNext: xpToNext, coin: coin },
      });
    }
  }, [winner, xp, level]);
  return (
    <div className="flex flex-col items-center px-2">
      {size ? (
        <div>
          {/* //loader */}
          <div className="h-10">
            {!winner && isLock && (
              <div className="flex justify-center items-center">
                <h1 className="text-2xl mx-2 text-blue-400">Memorize</h1>
                <h1 className="loader"></h1>
              </div>
            )}
          </div>
          {/* gameUI */}
          <div className="w-full overflow-x-auto overflow-hidden flex items-center justify-center">
            <div
              className="w-[90%]  grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${Math.ceil(
                  Math.sqrt(size * 2)
                )}, minmax(0, 2fr))`,
              }}
            >
              {winner ? (
                <div className="col-span-full  ">
                  <h1 className=" text-xl md:text-3xl  text-green-400 text-center ">
                    New Record Just in
                    <span className="text-destructive/90 mx-2">
                      {formatTime(time)}
                    </span>
                    Seconds
                  </h1>
                  <div className="relative grid grid-cols place-content-center mt-3">
                    <div className="flex justify-center">
                      {!playAgain ? (
                        <h1 className="text-xl text-center">
                          Ready to{" "}
                          <button
                            onClick={() => {
                              setWinner(false);
                              setSize(0);
                            }}
                            className="text-destructive active:text-destructive/70 hover:text-destructive/70"
                          >
                            Replay
                          </button>{" "}
                          or{" "}
                          <button
                            onClick={() => {
                              setSize(size + 3);
                              setWinner(false);
                            }}
                            className="text-chart-2 active:text-chart-2/70 hover:text-chart-2/70"
                          >
                            {" "}
                            level Up.
                          </button>
                        </h1>
                      ) : (
                        <button
                          onClick={() => {
                            setPlayAgain(!playAgain);
                          }}
                          className="px-2 border-2 border-chart-2/30 text-lg font-semibold text-foreground rounded-lg bg-chart-2 hover:bg-transparent hover:text-chart-2 hover:border-chart-2"
                        >
                          Play Again!
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                CARDS.map((card) => (
                  <button
                    onClick={() => handleFliped(card.id)}
                    key={card.id}
                    className={`aspect-square w-full lg:p-3 md:p-3 md-text-4xl lg:text-4xl text-lg  flex items-center justify-center rounded-sm lg:rounded-xl bg-gray-400  font-semibold ${
                      card.isFliped && "bg-red-400 text-red-700"
                    }`}
                  >
                    {card.isFliped ? (
                      <h1 className=""> {card.numbers}</h1>
                    ) : (
                      "?"
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        // input
        <div className="flex justify-center items-center w-[90%] ">
          <select
            name="level"
            onChange={(e) => setInputSize(e.target.value)}
            className="w-44 mx-2 bg-background/30  font-semibold border border-gray-300 dark:border-zinc-700 rounded-md px-3 py-2 shadow-sm hover:border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-300 transition duration-200 ease-in-out appearance-none"
          >
            <option
              className=" text-foreground/50 bg-background/90 "
              value="easy"
            >
              Easy
            </option>
            <option
              className=" text-foreground/50 bg-background/90 "
              value="medium"
            >
              Medium
            </option>
            <option
              className=" text-foreground/50 bg-background/90 "
              value="hard"
            >
              Hard
            </option>
          </select>

          <button
            onClick={handleSizeButton}
            className="  px-2 border-2 border-red-500 text-lg font-semibold text-foreground rounded-lg bg-red-400 hover:bg-transparent hover:text-red-400 hover:border-red-400"
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame_Logic;
