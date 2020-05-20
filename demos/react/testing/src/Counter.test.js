import React from "react";
import { render, fireEvent, queryAllByText } from "@testing-library/react";
import Counter from "./Counter";

//SMOKETEST
test("it renders without crashing", () => {
  render(<Counter />);
});

// test("playing with queries", () => {
//   const {
//     getAllByText,
//     getByText,
//     queryByText,
//     getByPlaceholderText,
//     getByLabelText,
//   } = render(<Counter />);
//   console.log(getByPlaceholderText("username"));
//   console.log(getByLabelText("Username"));
//   console.log(getAllByText("count", { exact: false }));
//   console.log(queryAllByText("count", { exact: false }));
// });

// test("playing with matchers", () => {
//   const { getByText } = render(<Counter />);
// });

test("button increments counter", () => {
  const { getByText, debug } = render(<Counter />);
  //DEBUG CONSOLE.LOGS THE CURRENT STATE 
  //OF THE COMPONENT IN THE DOM
  debug();
  const h2 = getByText("Current count: 0");
  const btn = getByText("Add");
  fireEvent.click(btn);
  //debugger;
  expect(h2).toHaveTextContent("1");
  expect(h2).not.toHaveTextContent("0");
  debug();
});
