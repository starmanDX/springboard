import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import { v4 as uuid } from "uuid/dist";

function BoxList() {
  const INITIAL_STATE = [];
  const [boxes, setBoxes] = useState(INITIAL_STATE);
  const createBox = (newBox) => {
    setBoxes((boxes) => [...boxes, { ...newBox, id: uuid() }]);
  };
  const removeBox = (id) => {
    setBoxes((boxes) => boxes.filter((box) => box.id !== id));
  };
  return (
    <div className="BoxList">
      <NewBoxForm createBox={createBox} />
      {boxes.map((box) => (
        <Box
          key={box.id}
          id={box.id}
          removeBox={removeBox}
          backgroundColor={box.backgroundColor}
          height={box.height}
          width={box.width}
        />
      ))}
    </div>
  );
}

export default BoxList;
