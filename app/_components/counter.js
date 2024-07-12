"use client";

import { useState } from "react";

const Counter = () => {
  const [count, setInCreaseCount] = useState(0);
  return (
    <div>
      <button onClick={() => setInCreaseCount((c) => c + 1)}>{count}</button>
    </div>
  );
};

export default Counter;
