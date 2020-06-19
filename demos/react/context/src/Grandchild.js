import React from "react";
import GreatGrandchild from "./GreatGrandchild";

function Grandchild() {
  return (
    <div style={{ border: `4px solid #39CCCC`, margin: `1rem` }}>
      <p>I'm the grandchild!</p>
      <GreatGrandchild />
    </div>
  );
}

export default Grandchild;
