import React, { useState } from "react";
import "./Face.css";

const Face = ({ bgColor, answerColor, text }) => {
  const divStyle = {
    backgroundColor: bgColor,
  };
  if (answerColor) {
    return (
      <div className="Face" style={divStyle}>
        <div>
          <p className="Face-text">{text}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Face" style={divStyle}>
        <p className="Face-text">{text}</p>
      </div>
    );
  }
};

export default Face;
