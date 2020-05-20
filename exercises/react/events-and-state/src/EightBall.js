import React, { useState } from "react";
import Face from "./Face";
import answers from "./answers";
import "./EightBall.css";

const EightBall = () => {
  const genRandom = () => Math.floor(Math.random() * 20);
  const [answer, setAnswer] = useState(answers[genRandom()]);
  const [questionOrAnswer, setQuestionOrAnswer] = useState("question");
  const questionShowing = questionOrAnswer === "question";
  const reset = () => {
    setQuestionOrAnswer("question");
    setAnswer(answers[genRandom()]);
  };
  return (
    <>
      <div
        className="clicker"
        onClick={() =>
          questionShowing ? setQuestionOrAnswer("answer") : reset()
        }
      ></div>
      <div className="EightBall">
        <div className="EightBall-face">
          <Face questionOrAnswer={questionOrAnswer} answer={answer} />
        </div>
      </div>
    </>
  );
};

export default EightBall;
