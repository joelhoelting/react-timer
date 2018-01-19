import React from 'react';

import './Timer.css';

const Timer = (props) => {
  const {time} = props;
  return (
    <div className="timer">
      <h1>{time.minutes}:{time.seconds}</h1>
    </div>
  );
};

export default Timer;
