import React, { useState, useRef, useEffect } from "react";

function Video({
  src = "https://media.giphy.com/media/13nN1XlbXhqqTC/giphy.mp4",
}) {
  const [speed, setSpeed] = useState(1);
  const videoRef = useRef();
  useEffect(() => {
    videoRef.current.playbackRate = speed;
  }, [speed]);
  return (
    <>
      <video muted autoPlay loop ref={videoRef}>
        <source src={src} />
      </video>
      <div>
        <button onClick={() => setSpeed((s) => s / 2)}>Slow</button>
        <button onClick={() => setSpeed((s) => s * 2)}>Fast</button>
        <p>Current Speed: {speed}</p>
      </div>
    </>
  );
}

export default Video;
