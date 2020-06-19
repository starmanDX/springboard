import React, { useContext } from "react";
import CountContext from "./CountContext";
import GreatGreatGrandchild from "./GreatGreatGrandchild";

function GreatGrandchild() {
  const { count, increment } = useContext(CountContext);
  return (
    <div style={{ border: `4px solid #7FD8FF`, margin: `1rem` }}>
      <p>I'm the great-grandchild!</p>
      <p>I consume Child's count context: {count}</p>
      <button onClick={increment}>Increment Count</button>
      <GreatGreatGrandchild />
    </div>
  );
}

export default GreatGrandchild;
