import { useState, useEffect } from "react";

function Stopwatch() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 60);
    const miliSeconds = time % 60;
    return `${String(seconds).padStart(2, "0")}:${String(miliSeconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
      <button
        onClick={() => {
          setIsRunning(false);
          setTime(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Stopwatch;
