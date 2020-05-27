import React, { useState } from "react";

function NewTodoForm({ createTodo }) {
  const INITIAL_STATE = {
    task: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo({ ...formData });
    setFormData(INITIAL_STATE);
  };
  return (
    <div className="NewTodoForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Add A Todo Task:</label>
        <input
          id="task"
          type="text"
          name="task"
          placeholder="Task"
          value={formData.task}
          onChange={handleChange}
        />
        <button>Add New Todo Task</button>
      </form>
    </div>
  );
}

export default NewTodoForm;
