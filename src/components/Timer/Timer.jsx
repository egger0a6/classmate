import { useEffect, useState } from "react";

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(.5 * 60);
  const [timer, setTimer] = useState();
  const [minutesLeft, setMinutesLeft] = useState(1)

  const start = () => {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <div className="Timer">
      <button onClick={start}>start</button>
      <div>{secondsLeft} seconds left</div>
    </div>
  );
}



