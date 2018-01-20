import React from 'react';

import './Timer.css';

const Timer = (props) => {
  function parseTime(time) {
    return time < 10 ? '0' + time : time;
  }

  const {time} = props;

  return (
    <div className="timer">
      <h1>{parseTime(time.minutes)}:{parseTime(time.seconds)}</h1>
    </div>
  );
};

export default Timer;
