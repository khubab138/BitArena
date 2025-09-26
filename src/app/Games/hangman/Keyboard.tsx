import { FC } from "react";

type KeyboardProps = {
  disabled?: boolean;
  activeLetter: string[];
  inActiveLetter: string[];
  addguessedletter: (letter: string) => void;
};

const KEY = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Keyboard: FC<KeyboardProps> = ({
  activeLetter,
  inActiveLetter,
  addguessedletter,
  disabled = false,
}) => {
  return (
    <div className=" w-3/4 flex flex-wrap justify-center">
      {KEY.map((key) => {
        const isActive = activeLetter.includes(key);
        const isInactive = inActiveLetter.includes(key);
        const isButtonDisabled = isActive || isInactive || disabled;

        return (
          <button
            key={key}
            onClick={() => addguessedletter(key)}
            disabled={isButtonDisabled}
            className={`
              w-8 h-8 p-1 m-1 text-xl flex items-center justify-center uppercase border-2 rounded transition-colors duration-150
              ${isActive ? "bg-blue-500 text-white border-blue-500" : ""}
              ${
                isInactive
                  ? "bg-gray-300 text-white border-gray-300 cursor-not-allowed"
                  : ""
              }
              ${
                !isActive && !isInactive && !disabled
                  ? "hover:bg-secondary border-foreground/50"
                  : ""
              }
              ${disabled ? "cursor-not-allowed opacity-50" : ""}
            `}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
