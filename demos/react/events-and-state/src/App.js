import React from 'react';
import Clicker from './Clicker';
import Counter from './Counter';
import NumberGame from './NumberGame';
import ButtonGroup from './ButtonGroup';
import './App.css';

function App() {
  return (
    <div className="App">
      <ButtonGroup />
      <Clicker />
      <Counter />
      <NumberGame />
    </div>
  );
}

export default App;
