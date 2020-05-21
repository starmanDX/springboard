import React from 'react';
import SimpleCounter from './SimpleCounter'
import NumbersList from './NumbersList'
import ColoredCircles from "./ColoredCircles"
import './App.css';

function App() {
  return (
    <div className="App">
      <ColoredCircles />
      {/* <SimpleCounter />
      <h4>Numbers List</h4>
      <NumbersList /> */}
    </div>
  );
}

export default App;
