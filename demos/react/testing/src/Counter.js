import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return (
    <>
      <h1>Let's count!</h1>
      <h2>Current count: {count}</h2>
      <button onClick={increment}>Add</button>
      {/* <label htmlFor="usr">Username</label>
      <input id="usr" type="text" placeholder="username"/> */}
    </>
  );
}

export default Counter;
