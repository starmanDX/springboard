import React, { useState } from "react";
import Timer from "./Timer";

const TimerWrapper = () => {
  const [timerVisible, setTimerVisible] = useState(true);
  const toggleTimer = () => {
    setTimerVisible(!timerVisible);
  };
  return (
    <>
      {timerVisible && <Timer />}
      <button onClick={toggleTimer}>Toggle Timer</button>
    </>
  );
};

export default TimerWrapper;
