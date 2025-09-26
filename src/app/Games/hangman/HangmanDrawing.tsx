import { Frown, Meh, Smile } from "lucide-react";

type HangmanDrawingProps = {
  numberOfGuesses: number;
  isWinner: boolean;
  isLoser: boolean;
};

const HangmanDrawing = ({
  numberOfGuesses,
  isWinner,
  isLoser,
}: HangmanDrawingProps) => {
  const HEAD = (
    <div className="absolute top-12 right-[31%] border-foreground rounded-full ">
      {isWinner ? (
        <Smile className="w-10 h-10" />
      ) : isLoser ? (
        <Frown className="w-10 h-10" />
      ) : (
        <Meh className="w-10 h-10" />
      )}
    </div>
  );

  const BODY = (
    <div className="absolute top-22 right-[40%] h-20 w-1.5 bg-foreground" />
  );

  const RIGHT_ARM = (
    <div className="absolute top-20 right-[30%] h-12 w-1 bg-foreground rotate-50" />
  );

  const LEFT_ARM = (
    <div className="absolute top-20 right-[51%] h-12 w-1 bg-foreground -rotate-50" />
  );

  const LEFT_LEG = (
    <div className="absolute top-40 right-[49%] h-12 w-1 bg-foreground rotate-40" />
  );

  const RIGHT_LEG = (
    <div className="absolute top-40 right-[32%] h-12 w-1 bg-foreground -rotate-40" />
  );

  const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];
  return (
    <div className="relative  h-80 w-50  overflow-y-hidden border-foreground">
      {isLoser ? (
        <div className="rotate-10">{BODY_PARTS.slice(0, numberOfGuesses)}</div>
      ) : (
        BODY_PARTS.slice(0, numberOfGuesses)
      )}
      <div className="h-1 w-27 bg-foreground ml-10 " />
      <div className="h-78 top-0 w-1 bg-foreground ml-10 " />
      <div className="h-12 w-1 bg-foreground top-0 right-[40%] absolute" />
      <div className="h-18 w-1 bg-foreground rotate-40 top-0 left-13 absolute " />
      <div className="h-15 w-1 bg-foreground rotate-40 bottom-0 left-7 absolute" />
      <div className="h-15 w-1 bg-foreground -rotate-40 bottom-0 left-13 absolute" />
      <div className="h-1 w-50 bg-foreground bottom-1 absolute" />

      {/* <div className="h-2 w-40 bg-foreground ml-15" />
      // <div className="h-12 w-2 bg-foreground top-0 right-45 absolute" />
      <div className="h-80 w-2 bg-foreground ml-15" />
      <div className="h-2 w-full bg-foreground " /> */}
    </div>
  );
};

export default HangmanDrawing;
