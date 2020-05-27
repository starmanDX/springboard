import React, { useState, useEffect } from "react";

const Counter = () => {
  const [num, setNum] = useState(0);
  const increment = () => {
    setNum((n) => n + 1);
    };
    useEffect(() => {
        document.title = `useEffect${'!'.repeat(num)}`
    })
    return (
        <div>
            Let's get excited.
            <button onClick={increment}>Get more excited.</button>
            <p>Excitement level: {num}</p>
        </div>
    )
};

export default Counter;
