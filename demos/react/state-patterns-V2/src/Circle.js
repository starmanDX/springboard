import React, { useState } from "react";
import "./Circle.css";

const getRandom = (min = 0, max = 100) => Math.random() * (max - min) + min;

const Circle = ({ color, idx }) => {
  const [position, setPosition] = useState({ x: getRandom(), y: getRandom() });
  const moveCircle = () => {
    setPosition({ x: getRandom(), y: getRandom() });
  };
  return (
    <div
      onClick={moveCircle}
      className="Circle"
      style={{
        backgroundColor: color,
        position: "absolute",
        top: `${position.y}vh`,
        left: `${position.x}vw`,
      }}
    >
      {idx + 1}
    </div>
  );
};

export default Circle;
