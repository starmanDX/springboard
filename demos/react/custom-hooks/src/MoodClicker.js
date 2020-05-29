import React from "react";
import useToggleState from './hooks/useToggleState'
import './MoodClicker.css'

const MoodClicker = () => {
  const [mood, setMood] = useToggleState(false);
  const [mode, setMode] = useToggleState(false);
  return (
    <div className={mode ? 'Clicker-dark' : 'Clicker-light'}>
      <h1>{mood ? "😊" : "😟"}</h1>
      <button onClick={setMood}>Change Mood</button>
      <button onClick={setMode}>Change Dark/Light Mode</button>
    </div>
  );
};

export default MoodClicker;
