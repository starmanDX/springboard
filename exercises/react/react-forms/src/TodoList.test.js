import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

function addTodo(todoList, task = "test the app") {
  const taskInput = todoList.getByLabelText("Add A Todo Task:");
  fireEvent.change(taskInput, { target: { value: task } });
  const button = todoList.getByText("Add New Todo Task");
  fireEvent.click(button);
}

it("renders without crashing", function () {
  render(<TodoList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("creates a new todo task", function () {
  const todoList = render(<TodoList />);

  expect(todoList.queryByText("Remove Todo Task")).not.toBeInTheDocument();

  addTodo(todoList);
  const removeButton = todoList.getByText("Remove Todo Task");

  expect(removeButton).toBeInTheDocument();
  expect(removeButton.previousSibling).toContainHTML("<li>test the app</li>");

  expect(todoList.getAllByDisplayValue("")).toHaveLength(1);
});

it("removes a todo task", function () {
  const todoList = render(<TodoList />);

  addTodo(todoList);
  const removeButton = todoList.getByText("Remove Todo Task");

  fireEvent.click(removeButton);
  expect(removeButton).not.toBeInTheDocument();
});
