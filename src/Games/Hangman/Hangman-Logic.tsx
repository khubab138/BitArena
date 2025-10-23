"use client";
import { useCallback, useEffect, useState } from "react";
import words from "./WordList.json";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWords from "./HangmanWords";
import Keyboard from "./Keyboard";
import HintBox from "./HintBox";
import HintBoxEmoji from "./HintBoxEmoji";
import { UserState } from "@/lib/type";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { useUpdateUsersMutation } from "@/Store/firestoreAPI";
import XP from "../XP";

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const Hangman_Logic = () => {
  const [wordToGuess, setWordToGuess] = useState<string>(getRandomWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [hint, setHint] = useState(false);
  // Fetching Data
  const UserName: UserState = useSelector((state: RootState) => state.User);
  const [updateUsers] = useUpdateUsersMutation();

  const { xp, level, xpToNext, coin, handleMatch } = XP();

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

  //HINT Handler
  useEffect(() => {
    if (incorrectLetters[2]) {
      setHint(true);
    }
  }, [incorrectLetters]);

  function PlayAgain() {
    setGuessedLetters([]);
    setWordToGuess(getRandomWord());
    setHint(false);
  }

  // Updating XP
  useEffect(() => {
    if (isWinner) {
      handleMatch("win");
    } else if (isLoser) {
      handleMatch("lose");
    } else if (hint) {
      handleMatch("draw");
    }
  }, [isWinner, isLoser, hint]);

  console.log("check", isWinner, isLoser, hint);
  console.log("XP", xp);

  //setting a data to server
  useEffect(() => {
    if (isWinner || isLoser || hint) {
      updateUsers({
        id: UserName.PLayerId,
        data: { level: level, xp: xp, xpToNext: xpToNext, coin: coin },
      });
    }
  }, [isWinner, isLoser, xp, level]);

  return (
    <div className="max-w-[500px]  flex flex-col gap-5 mx-auto items-center">
      <div className="relative ">
        {(hint || isLoser || isWinner) && (
          <div className="transform -translate-x-20 md:translate-x-0  absolute top-8 left-35 h-5 min-w-50 max-w-100">
            <div className="relative flex items-center px-2 sm:w-[50] md:min-w-[250px] mx-auto text-lg text-center leading-relaxed border-2 border-foreground/50 rounded-full">
              {isWinner
                ? "That was close!"
                : isLoser
                ? "Poetic, isn’t it?"
                : hint && (
                    <div className="text-sm  md:text-lg">
                      <HintBox word={wordToGuess} />
                    </div>
                  )}
              {(isWinner || isLoser) && (
                <div className=" ">
                  <button
                    onClick={PlayAgain}
                    className=" rounded-lg text-lg px-2 mx-1  text-chart-2 hover:bg-background/60 active:bg-background/60"
                  >
                    PlayAgain
                  </button>
                </div>
              )}
              <div className="absolute -left-3 bottom-[-25px] w-6 h-6 border-2 border-foreground/50 rounded-full"></div>
              <div className="absolute -left-6 bottom-[-30px] w-3 h-3  border-2 border-foreground/50 rounded-full"></div>
            </div>
          </div>
        )}

        <h1 className="text-center h-5 mb-2 text-xl transform -translate-x-20 md:translate-x-0">
          <HintBoxEmoji word={wordToGuess} />
        </h1>
        <div className="transform -translate-x-20 md:translate-x-0">
          <HangmanDrawing
            isWinner={isWinner}
            isLoser={isLoser}
            numberOfGuesses={incorrectLetters.length}
          />
        </div>
      </div>

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

export default Hangman_Logic;
