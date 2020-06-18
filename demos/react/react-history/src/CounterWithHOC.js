import React from "react";
import withCounter from "./withCounter";

const Counter = (props) => (
    <div style={{ color: props.color }}>
    <div>Current count: {props.count}</div>
    <div>
      <button onClick={props.onDecrease}>Decrease</button>
      <button onClick={props.onIncrease}>Increase</button>
    </div>
  </div>
);

export default withCounter(Counter);
