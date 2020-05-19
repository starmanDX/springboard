import React, { useState } from "react";
import Face from "./Face";
import "./EightBall.css";

const EightBall = ({ answers }) => {
  const genRandom = () => Math.floor(Math.random() * 20) + 1;
  const [bgColor, setBgColor] = useState("white");
  const [answerColor, setAnswerColor] = useState("white");
  const [text, setText] = useState("8");
  const answerShowing = bgColor === "black";
  return (
    <div className="clicker">
      <div className="EightBall">
        {answerShowing ? (
          <Face bgColor={bgColor} answerColor={answerColor} text={text} />
        ) : (
          <Face bgColor={bgColor} text={text} />
        )}
      </div>
    </div>
  );
};

export default EightBall;
