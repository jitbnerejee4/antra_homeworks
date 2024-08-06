import React, { useState, useRef } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [displayMinutes, setDisplayMinutes] = useState(0);
  const [displaySeconds, setDisplaySeconds] = useState(0);
  const timeRemaining = useRef(0);
  const timeInterval = useRef(null);
  const paused = useRef(false);
  const started = useRef(false)


  const handleMinuteChange = (event) => {
    const value = event.target.value ? parseInt(event.target.value) : 0;
    setMinutes(value);
  };

  const handleSecondChange = (event) => {
    const value = event.target.value ? parseInt(event.target.value) : 0;
    setSeconds(value);
  };

  const updateDisplay = () => {
    setDisplayMinutes(Math.floor(timeRemaining.current / 60));
    setDisplaySeconds(timeRemaining.current % 60);
  };

  const handleStart = () => {
    if(!started.current){
        started.current = true
        clearInterval(timeInterval.current);
        timeRemaining.current = minutes * 60 + seconds;
        updateDisplay();
        timeInterval.current = setInterval(() => {
        if (timeRemaining.current <= 0) {
            clearInterval(timeInterval.current);
            console.log("DONE");
        } else {
            timeRemaining.current -= 1;
            updateDisplay();
        }
        }, 100);
    }

  };

  const handlePause = () => {
    if (paused.current) {
      paused.current = false;
      timeInterval.current = setInterval(() => {
        if (timeRemaining.current <= 0) {
          clearInterval(timeInterval.current);
          console.log("DONE");
        } else {
          timeRemaining.current -= 1;
          updateDisplay();
        }
      }, 100);
    } else {
      paused.current = true;
      clearInterval(timeInterval.current);
    }
  };

  const handleReset = () => {
    clearInterval(timeInterval.current);
    timeInterval.current = null;
    paused.current = false;
    started.current = false;
    setMinutes(0);
    setSeconds(0);
    timeRemaining.current = 0;
    setDisplayMinutes(0);
    setDisplaySeconds(0);
  };

  return (
    <div>
      <h1>Timer</h1>
      <div>
        <input
          type="number"
          value={minutes}
          onChange={handleMinuteChange}
          id="minutes"
        />
        <label htmlFor="minutes">Minutes</label>
        <input
          type="number"
          value={seconds}
          onChange={handleSecondChange}
          id="seconds"
        />
        <label htmlFor="seconds">Seconds</label>
        <button type="button" onClick={handleStart}>
          START
        </button>
      </div>
      <div>
        <button type="button" onClick={handlePause}>
          PAUSE/RESUME
        </button>
        <button type="button" onClick={handleReset}>
          RESET
        </button>
      </div>
      <div>
        <p>
          {displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes} : {displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}
        </p>
      </div>
    </div>
  );
}
