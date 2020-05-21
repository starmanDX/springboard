import React from "react";
import "./Circle.css";

const Circle = ({changePosition, color, idx, x, y}) => {
  return (
    <div onClick={()=> changePosition(idx)}className="Circle" style={{ backgroundColor: color, position: 'absolute', top: `${y}vh`, left: `${x}vw`}}>
      {idx + 1}
    </div>
  );
};

export default Circle;
