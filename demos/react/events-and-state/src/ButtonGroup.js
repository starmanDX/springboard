import React from "react";

const ButtonGroup = () => {
  const printColor = (color) => {
    console.log(`YOU CLICKED ${color}!`);
  };
  return (
    <>
      <button onClick={() => printColor('RED')}>Red</button>
      <button onClick={() => printColor('YELLOW')}>Yellow</button>
      <button onClick={() => printColor('GREEN')}>Green</button>
    </>
  );
};

export default ButtonGroup;
