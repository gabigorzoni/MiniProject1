import React, { useState } from 'react';
import './App.css';

const PropsAndState = (props) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div class="divCount">
      <p>Number of reps for all list: {props.receivedProp}</p>
      <button onClick={incrementCount} class="button">+</button>
      { count }
      <button onClick={decrementCount} class="button">-</button>
    </div>
  );
};

export default PropsAndState;