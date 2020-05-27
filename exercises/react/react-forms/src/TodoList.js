import React, { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import { v4 as uuid } from "uuid/dist";

function TodoList() {
  const INITIAL_STATE = [];
  const [todos, setTodos] = useState(INITIAL_STATE);
  const createTodo = (newTodo) => {
    setTodos((todos) => [...todos, { ...newTodo, id: uuid() }]);
  };
  const removeTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };
  return (
    <div className="TodoList">
      <NewTodoForm createTodo={createTodo} />
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            removeTodo={removeTodo}
            task={todo.task}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
