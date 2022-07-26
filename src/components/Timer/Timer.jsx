import { useEffect, useState } from "react";

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(1 * 60);
  const [timer, setTimer] = useState();

  const Timer = () => {
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
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <button onClick={start}>start</button>
      <div>{secondsLeft} seconds left</div>
    </div>
  );
}

export default Timer


