import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

function addBox(boxList, height = "2", width = "2", color = "red") {
  const heightInput = boxList.getByLabelText("Height (in px):");
  const widthInput = boxList.getByLabelText("Width (in px):");
  const backgroundInput = boxList.getByLabelText("Background Color:");
  fireEvent.change(backgroundInput, { target: { value: color } });
  fireEvent.change(widthInput, { target: { value: width } });
  fireEvent.change(heightInput, { target: { value: height } });
  const button = boxList.getByText("Create Box");
  fireEvent.click(button);
}

it("renders without crashing", function () {
  render(<BoxList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("creates a new box", function () {
  const boxList = render(<BoxList />);

  expect(boxList.queryByText("Remove Box")).not.toBeInTheDocument();

  addBox(boxList);
  const removeButton = boxList.getByText("Remove Box");

  expect(removeButton).toBeInTheDocument();
  expect(removeButton.previousSibling).toHaveStyle(`
    width: 2px;
    height: 2px;
    background-color: red;
  `);

  expect(boxList.getAllByDisplayValue("")).toHaveLength(1);
  expect(boxList.getAllByDisplayValue("1")).toHaveLength(2);
});

it("can remove a box", function () {
  const boxList = render(<BoxList />);

  addBox(boxList);
  const removeButton = boxList.getByText("Remove Box");

  fireEvent.click(removeButton);
  expect(removeButton).not.toBeInTheDocument();
});
