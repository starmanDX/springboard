import React from "react";
import Dice from "./Dice";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Dice numDice={2} maxVal={6} title={"Roll Me!"}/>
      <Dice />
    </div>
  );
}

export default App;
