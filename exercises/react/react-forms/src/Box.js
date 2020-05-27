import React from "react";

function Box({ id, removeBox, backgroundColor, height, width}) {
  const remove = () => removeBox(id);
  return (
    <div className="Box">
      <div
        style={{
          border: `1px solid black`,
          backgroundColor,
          height: `${height}px`,
          width: `${width}px`,
        }}
      ></div>
      <button onClick={remove}>Remove Box</button>
    </div>
  );
}

export default Box;
