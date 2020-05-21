import React from "react";
import ColorButton from "./ColorButton";

const ColorButtons = ({ options, addCircle }) => {
  return (
    <>
      {options.map((color) => (
        <ColorButton color={color} addCircle={addCircle} />
      ))}
    </>
  );
};

export default ColorButtons;
