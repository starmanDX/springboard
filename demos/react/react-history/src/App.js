import React from "react";
import Counter from "./Counter";
import Counter2 from "./Counter2";
import EggCounter from "./EggCounter";
import CounterWithHOC from "./CounterWithHOC";
import ThingCounter from "./ThingCounter";
import CounterRenderProps from "./Counter3";
import CounterWithHooks from "./Counter4";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <Counter color="purple" initialVal="10" />
      <Counter initialVal="10" />
      <Counter2 />
      <EggCounter />
      <CounterWithHOC color="pink"/>
      <ThingCounter />
      <CounterRenderProps /> */}
      <CounterWithHooks />
    </div>
  );
}

export default App;
