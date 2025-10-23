import { CardProps, NavItem } from "./type";

export const CARDS: CardProps[] = [
  {
    title: "Memory Game",
    link: "/gameboard/memorygame",
    bgColor: "bg-[#45515F]",
    imgSrc: "memory.png",
    imgalt: "abstract_swirl",
    imgClasse:
      "transition-transform duration-500 group-hover:rotate-145 group-hover:scale-200  ",
  },
  {
    title: "TicTacToe",
    link: "/gameboard/tictactoe",
    bgColor: "bg-[#A6CEC5]",
    imgSrc: "tictactoe.png",
    imgalt: "tictactoe",
    imgClasse:
      "relative overflow-hidden scale-200 transition-transform duration-500 group-hover:blur-none group-hover:scale-100",
  },

  {
    title: "HangMan",
    link: "/gameboard/hangman",
    bgColor: "bg-[#A6CEC5]",
    imgSrc: "hangman.png",
    imgalt: "guillotine",
    imgClasse: "h-60 w-60",
    extraClasses: true,
  },
];

export const NavOptions: NavItem[] = [
  { title: "About", link: "/about" },
  { title: "Info", link: "/info" },

  {
    title: "Games",
    link: "/",
    subOptions: [
      { title: "TicTacToe", link: "/gameboard/tictactoe" },
      { title: "Memory", link: "/gameboard/memorygame" },
      { title: "HangMan", link: "/gameboard/hangman" },
    ],
  },
];
