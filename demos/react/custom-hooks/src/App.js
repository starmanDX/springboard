import React from "react";
import MoodClicker from "./MoodClicker";
import ColorPicker from "./ColorPicker";
import Counter from "./Counter"
import DogDetail from "./DogDetail"
import SignupForm from "./SignupForm" 
import "./App.css";

function App() {
  return (
    <div className="App">
      <MoodClicker />
      <Counter />
      <ColorPicker />
      <SignupForm />
      <DogDetail />
    </div>
  );
}

export default App;
