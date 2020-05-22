import React, { useState } from "react";
import Circle from "./Circle";
import ColorButtons from "./ColorButtons";

const ColoredCircles = () => {
  const [circles, setCircles] = useState([]);
  const addCircle = (color) => {
    setCircles((circles) => [...circles, color]);
  };

  return (
    <>
      <ColorButtons
        options={["peachpuff", "lightsteelblue", "paleturquoise"]}
        addCircle={addCircle}
      />
      {circles.map((color, idx) => (
        <Circle color={color} idx={idx} key={idx} />
      ))}
    </>
  );
};

export default ColoredCircles;
