import { useState } from "react";
import "./App.css";
import CountdownTimer from "./CountdownTimer";

const defaultState = {
  breakTime: 5,
  sessionTime: 25,
  flag: false,
};

function App() {
  const [state, setState] = useState(defaultState);
  const [resetKey, setResetKey] = useState(0);

  function decrementBreakCount() {
    setState((prevState) => {
      if (prevState.breakTime <= 1) return prevState;
      return { ...prevState, breakTime: prevState.breakTime - 1 };
    });
  }

  function incrementBreakCount() {
    setState((prevState) => {
      if (prevState.breakTime >= 60) return prevState;
      return { ...prevState, breakTime: prevState.breakTime + 1 };
    });
  }

  function decrementSessionCount() {
    setState((prevState) => {
      if (prevState.sessionTime <= 1) return prevState;
      return { ...prevState, sessionTime: prevState.sessionTime - 1 };
    });
  }

  function incrementSessionCount() {
    setState((prevState) => {
      if (prevState.sessionTime >= 60) return prevState;
      return { ...prevState, sessionTime: prevState.sessionTime + 1 };
    });
  }

  function playPause() {
    setState((prevState) => {
      return { ...prevState, flag: !prevState.flag };
    });
  }

  function reset() {
    setResetKey((prevKey) => prevKey + 1);
    setState(defaultState);

    const audioElement = document.getElementById("beep");
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }

  return (
    <div id="container">
      <div id="header-container">
        <h1 id="header">25 + 5 Clock</h1>
      </div>
      <div id="button-container">
        <div id="break-container">
          <h2 id="break-label">Break Length</h2>
          <div id="break-buttons">
            <button
              id="break-decrement"
              disabled={state.flag}
              onClick={decrementBreakCount}
            >
              ↓
            </button>
            <h2 id="break-length">{state.breakTime}</h2>
            <button
              id="break-increment"
              disabled={state.flag}
              onClick={incrementBreakCount}
            >
              ↑
            </button>
          </div>
        </div>
        <div id="session-container">
          <h2 id="session-label">Session Length</h2>
          <div id="session-buttons">
            <button
              id="session-decrement"
              disabled={state.flag}
              onClick={decrementSessionCount}
            >
              ↓
            </button>
            <h2 id="session-length">{state.sessionTime}</h2>
            <button
              id="session-increment"
              disabled={state.flag}
              onClick={incrementSessionCount}
            >
              ↑
            </button>
          </div>
        </div>
      </div>
      <CountdownTimer
        key={resetKey}
        sessionTime={state.sessionTime}
        breakTime={state.breakTime}
        flag={state.flag}
      />
      <div id="timer-buttons">
        <button id="start_stop" onClick={playPause}>
          Play-Pause
        </button>
        <button id="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
