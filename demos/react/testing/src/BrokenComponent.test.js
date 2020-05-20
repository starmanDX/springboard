import React from "react";
import { render } from "@testing-library/react";
import BrokenComponent from "./BrokenComponent";

//SMOKETEST
test("it renders without crashing", () => {
  render(<BrokenComponent />);
});
