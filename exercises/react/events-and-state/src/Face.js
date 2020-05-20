import React from "react";
import "./Face.css";

const Face = ({ questionOrAnswer, answer }) => {
  if (questionOrAnswer === "question") {
    return (
      <div className="Face">
        <p className="Face-text">8</p>
      </div>
    );
  } else {
    const classes = `Face-answer ${answer.color}`;
    return (
      <>
        <div className={classes}></div>
        <p className="Face-answer-text">{answer.msg}</p>
      </>
    );
  }
};

export default Face;
