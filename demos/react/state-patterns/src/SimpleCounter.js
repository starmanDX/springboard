import React, { useState } from "react";

function SimpleCounter() {
  const [num, setNum] = useState(0);
  const clickUp = () => setNum(n => n + 1);
    const clickUpBy2 = () => {
      //USE CALLBACKS FOR MULTIPLE UPDATES TO STATE
    setNum(n => n + 1);
    setNum(n => n + 1);
  };

  return (
    <>
      <h3>Count: {num}</h3>
      <button onClick={clickUp}>Up</button>
      <button onClick={clickUpBy2}>Up By 2</button>
    </>
  );
}

export default SimpleCounter;
