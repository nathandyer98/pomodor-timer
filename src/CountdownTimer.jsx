import React, { useState, useEffect } from "react";

function CountdownTimer({ sessionTime, breakTime, flag }) {
  const [state, setState] = useState({
    sessionTimeCount: sessionTime * 60,
    breakTime: breakTime * 60,
  });

  const [isSession, setIsSession] = useState(true);

  function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    let formattedTime = `${min < 10 ? "0" : ""}${min}:${
      sec < 10 ? "0" : ""
    }${sec}`;
    return formattedTime;
  }

  function decreaseTimer(time) {
    setState((prevState) => {
      if (prevState[time] > 0) {
        return {
          ...prevState,
          [time]: prevState[time] - 1,
        };
      } else {
        return prevState;
      }
    });
  }

  useEffect(() => {
    setState({
      sessionTime: sessionTime * 60,
      breakTime: breakTime * 60,
    });
  }, [sessionTime, breakTime, isSession]);

  useEffect(() => {
    if (flag) {
      const timer = setInterval(() => {
        if (isSession) {
          decreaseTimer("sessionTime");
          if (state.sessionTime == 0) {
            setTimeout(() => {
              document.getElementById("beep").pause();
              document.getElementById("beep").currentTime = 0;
              document.getElementById("beep").play();
            }, 100);
            setIsSession(false);
          }
        } else {
          decreaseTimer("breakTime");
          if (state.breakTime == 0) {
            setTimeout(() => {
              document.getElementById("beep").pause();
              document.getElementById("beep").currentTime = 0;
              document.getElementById("beep").play();
            }, 1);
            setIsSession(true);
          }
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [flag, state, isSession]);

  return (
    <div id="timer-container">
      <h2 id="timer-label">{isSession ? "Session" : "Break"}</h2>
      <h1 id="time-left">
        {isSession
          ? formatTime(state.sessionTime)
          : formatTime(state.breakTime)}
      </h1>
      <audio
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        id="beep"
      ></audio>
    </div>
  );
}

export default CountdownTimer;
