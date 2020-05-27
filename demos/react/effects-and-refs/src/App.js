import React from "react";
import TimerWrapper from "./TimerWrapper";
import Counter from "./Counter";
import ProfileViewer from "./ProfileViewer"
import ProfileViewerWithSearch from "./ProfileViewerWithSearch"
import Video from "./Video"
import Focuser from "./Focuser"
import Timer2 from "./Timer2"
import "./App.css";

function App() {
  return (
    <div className="App">
      <Counter />
      <TimerWrapper />
      <ProfileViewer />
      <ProfileViewer name="starmanDX" color="teal"/>
      <ProfileViewer name="colt" color="orange" />
      <ProfileViewerWithSearch />
      <Video />
      <Focuser />
      <Timer2 />
    </div>
  );
}

export default App;
