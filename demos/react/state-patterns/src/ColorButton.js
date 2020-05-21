import React from "react";
import "./ColorButton.css";

const ColorButton = ({ color, addCircle }) => {
  return (
    <button
      className="ColorButton"
      style={{ backgroundColor: color }}
      onClick={() => addCircle(color)}
    >
      {color}
    </button>
  );
};

export default ColorButton;
