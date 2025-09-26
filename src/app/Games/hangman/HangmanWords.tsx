type HangmanWordsProps = {
  guessedLetters: string[];
  wordToGuess: string;
  Reveal?: boolean;
};

const HangmanWords = ({
  guessedLetters,
  wordToGuess,
  Reveal = false,
}: HangmanWordsProps) => {
  return (
    <div className="flex gap-3 text-4xl font-bold uppercase font-mono ">
      {wordToGuess.split("").map((letter, index) => (
        <span key={index} className="border-b-7 border-black">
          <span
            className={`${
              guessedLetters.includes(letter) || Reveal
                ? "visible"
                : "invisible"
            } ${
              !guessedLetters.includes(letter) && Reveal
                ? "text-red-500"
                : "text-black"
            }`}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWords;
