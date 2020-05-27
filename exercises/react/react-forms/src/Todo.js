import React from "react";

function Box({ id, removeTodo, task }) {
  const remove = () => removeTodo(id);
  return (
    <div className="Todo">
          <li>{task}</li>
      <button onClick={remove}>Remove Todo Task</button>
    </div>
  );
}

export default Box;