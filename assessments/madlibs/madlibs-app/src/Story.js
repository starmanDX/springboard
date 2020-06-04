import React from "react";
import "./Story.css";

function Story({ setShowStory, setStory, story }) {
  const restart = () => {
    setShowStory(false);
    setStory([]);
  };
  return (
    <div className="Story">
      <p>
        This is a test of the Madlib app using "{story.noun}" as the first noun,
        "{story.noun2}" as the second noun, "{story.adjective}" as the
        adjective, and "{story.color}" as the color. How's that for a madlib story!
      </p>
      <button onClick={restart}>Restart</button>
    </div>
  );
}

export default Story;
