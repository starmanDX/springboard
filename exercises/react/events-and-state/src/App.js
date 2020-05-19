import React from "react";
import answers from './answers'
import EightBall from './EightBall'
import './App.css'

function App() {
  return (
    <>
      <h1>Magic 8-Ball</h1>
      <p>Think of a question and click the 8-ball to receive an answer.</p>
      <EightBall answers={answers} />
    </>
  );
}

export default App;
