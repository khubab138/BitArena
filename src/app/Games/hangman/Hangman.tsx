"use client";
import { useCallback, useEffect, useState } from "react";
import words from "./WordList.json";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWords from "./HangmanWords";
import Keyboard from "./Keyboard";

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const Hangman = () => {
  const [wordToGuess, setWordToGuess] = useState<string>(getRandomWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 7;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  // Handle letter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!/^[a-z]$/.test(key)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);
    return () => document.removeEventListener("keypress", handler);
  }, [addGuessedLetter]);

  // Handle Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getRandomWord());
    };

    document.addEventListener("keypress", handler);
    return () => document.removeEventListener("keypress", handler);
  }, []);

  function PlayAgain() {
    setGuessedLetters([]);
    setWordToGuess(getRandomWord());
  }

  return (
    <div className="max-w-[500px]  flex flex-col gap-5 mx-auto items-center">
      <div className="h-10 text-xl text-center">
        {isWinner && " Winner!"}
        {isLoser && " Nice try! "}
        {isWinner ||
          (isLoser && (
            <button
              onClick={PlayAgain}
              className=" rounded-lg text-lg px-2 mx-1 py-1 text-chart-2 hover:bg-background/60 active:bg-background/60"
            >
              Play Again
            </button>
          ))}
      </div>

      <HangmanDrawing
        isWinner={isWinner}
        isLoser={isLoser}
        numberOfGuesses={incorrectLetters.length}
      />

      <HangmanWords
        Reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />

      <div className="flex justify-center items-center">
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetter={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inActiveLetter={incorrectLetters}
          addguessedletter={addGuessedLetter}
        />
      </div>
    </div>
  );
};

export default Hangman;
