import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ShoppingList from "./ShoppingList";

it("should render without crashing", () => {
  render(<ShoppingList />);
});

it("should match the snapshot", () => {
  const { asFragment } = render(<ShoppingList />);
  expect(asFragment()).toMatchSnapshot();
});

it("should add a new item", () => {
  const { queryByText, getByLabelText } = render(<ShoppingList />);
  const input = getByLabelText("Product");
  const btn = queryByText("Add Item");
  expect(queryByText(`Product Name: Chocolate Milk`)).not.toBeInTheDocument();
  fireEvent.change(input, { target: { value: "Chocolate Milk" } });
  fireEvent.click(btn)
  expect(queryByText(`Product Name: Chocolate Milk`)).toBeInTheDocument();
});
