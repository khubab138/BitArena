"use client";
import React, { useEffect, useState } from "react";

type CardType = {
  id: number;
  numbers: number;
  isFliped: boolean;
};

const MemoryGame: React.FC = () => {
  const [inputSize, setInputSize] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [CARDS, SetCARDS] = useState<CardType[]>([]);
  const [isLock, setIsLock] = useState<boolean>(false);
  const [flipCard, setFlipCard] = useState<number[]>([]);
  const [winner, setWinner] = useState<boolean>(true);

  function handleSizeButton(): void {
    setSize(inputSize);
    setWinner(false);
  }

  function gridGeneration(): CardType[] {
    const gridSize = Array.from({ length: size }, (_, index) => index + 1);
    const Grids = [...gridSize, ...gridSize].sort(() => Math.random() - 0.5);
    const Card = Grids.map((grid, index) => {
      return { id: index, numbers: grid, isFliped: false };
    });
    return Card;
  }

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
      setWinner(!winner);
    }
  }, [CARDS]);

  useEffect(() => {
    if (size > 0) {
      SetCARDS(gridGeneration());
    }
  }, [size]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center">
        <input
          max="1"
          className="text-foreground border w-10 border-red-500 text-md rounded-lg mr-2 bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          onChange={(e) => setInputSize(Number(e.target.value))}
        />
        <button
          onClick={handleSizeButton}
          className="  px-2 border-2 border-red-500 text-lg font-semibold text-foreground rounded-lg bg-red-400 hover:bg-transparent hover:text-red-400 hover:border-red-400"
        >
          Add
        </button>
      </div>

      <div className="h-10">
        {winner
          ? ""
          : isLock && (
              <div className="flex justify-center items-center">
                <h1 className="text-2xl mx-2 text-blue-400">Memorize</h1>
                <h1 className="loader"></h1>
              </div>
            )}
      </div>

      <div
        className="w-50"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(size * 2))}, 1fr)`,
        }}
      >
        {winner ? (
          <h1 className="text-7xl text-green-400">Winner</h1>
        ) : (
          CARDS.map((card) => (
            <button
              onClick={() => handleFliped(card.id)}
              className={`flex items-center h-10 w-10 text-3xl m-2 rounded-xl justify-center bg-gray-400 ${
                card.isFliped && "bg-red-400 text-red-700"
              }`}
              key={card.id}
            >
              {card.isFliped ? card.numbers : "?"}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
