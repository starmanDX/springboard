import React from "react";
import useCounter from "./useCounter";

const Counter4 = () => {
  const [count, inc, dec] = useCounter();
  return (
    <div>
      <h3>Count is: {count}</h3>
      <button onClick={dec}>Decrease</button>
      <button onClick={inc}>Increase</button>
    </div>
  );
};

export default Counter4;
