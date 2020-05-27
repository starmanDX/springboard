import React, {useState} from "react";

function NewBoxForm({ createBox }) {
  const INITIAL_STATE = {
    backgroundColor: "",
    height: "1",
    width: "1",
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
    createBox({ ...formData });
    setFormData(INITIAL_STATE);
  };
  return (
    <div className="NewBoxForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="backgroundColor">Background Color:</label>
        <input
          id="backgroundColor"
          type="text"
          name="backgroundColor"
          placeholder="Background Color"
          value={formData.backgroundColor}
          onChange={handleChange}
        />
        <label htmlFor="height">Height (in px):</label>
        <input
          id="height"
          type="number"
          name="height"
          placeholder="Height"
          min="1"
          step="1"
          value={formData.height}
          onChange={handleChange}
        />
        <label htmlFor="width">Width (in px):</label>
        <input
          id="width"
          type="number"
          name="width"
          placeholder="Width"
          min="1"
          step="1"
          value={formData.width}
          onChange={handleChange}
        />
        <button>Create Box</button>
      </form>
    </div>
  );
}

export default NewBoxForm;
