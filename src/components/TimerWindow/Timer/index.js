import React from 'react';

import './Timer.css';

const Timer = (props) => {
  const {timer} = props;
  return (
    <div className="timer">
      <h1>{timer}:00</h1>
    </div>
  );
};

export default Timer;
