import React, { useState } from 'react';
import './App.css';


const PropsAndState = (props) => {
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const gif = 'https://i.gifer.com/2vc.gif';

  const incrementCount = () => {
    setCount(count + 1);
    setShowMessage(true);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="divCount">
      <p>Number of reps for all list: {props.receivedProp}</p>
      <button onClick={incrementCount} class="button">+</button>
      { count }
      <button onClick={decrementCount} class="button">-</button>
      {showMessage && count === 10 && (
        <div>
          <p>You got it!</p>
          <img src={gif} alt="gif" />
        </div>
      )}
    </div>
  );
};

export default PropsAndState;