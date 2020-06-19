import React from "react";
import Child from "./Child";
import NavBar from "./NavBar";
import ThemeProvider from "./ThemeProvider"
import "./App.css";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <NavBar />
        <Child />
      </ThemeProvider>
    </div>
  );
}

export default App;
