import React from 'react';
import Food from './Food';
import FoodNav from './FoodNav';
import Routes from './Routes';
import Nav from "./Nav";

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <FoodNav />
        <Route path="/food/:name">
          <Food />
        </Route> */}
      <Nav />
      <Routes />
    </div>
  );
}

export default App;
