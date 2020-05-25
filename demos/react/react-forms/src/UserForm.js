import React, { useState } from "react";

const UserForm = () => {
  const initialState = { username: "", password: "", email: "" };
  const [formData, setFormData] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    alert(
      `Created user ${username} with email ${email} and password ${password}`
    );
    setFormData(initialState);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username </label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password </label>
      <input
        id="password"
        type="text"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />
      <label htmlFor="email">Email </label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button>Add me to list!</button>
    </form>
  );
};

export default UserForm;
