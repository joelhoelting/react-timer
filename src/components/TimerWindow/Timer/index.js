import React from 'react';

const Timer = (props) => {
  function parseTime(time) {
    return time < 10 ? '0' + time : time;
  }

  const { time } = props;

  const timer = {
    fontSize: '6rem',
    textAlign: 'center'
  };

  return (
    <div style={timer} className="timer">
      <h1>{parseTime(time.minutes)}:{parseTime(time.seconds)}</h1>
    </div>
  );
};

export default Timer;
