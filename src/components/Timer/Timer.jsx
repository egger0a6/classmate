import { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Timer() {
  const minutesDuration = 60
  const timerDuration = minutesDuration * 60
  const [secondsLeft, setSecondsLeft] = useState(timerDuration);
  const [timer, setTimer] = useState();
  const [buttonText, setbuttonText] = useState('Start')

  const start = () => {
    setbuttonText('Next Round')
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
    setbuttonText('Reset')
  };

  
  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);
  
  useEffect(() => {
    setSecondsLeft(timerDuration)
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <div className="Timer">
      <button onClick={start}>{buttonText}</button>
      <div>{(secondsLeft / 60).toFixed(2)} Minutes Left | <CircularProgress variant="determinate" value={secondsLeft} /></div>
    </div>
  );
}

