import React from 'react';
import Radium from 'radium';

const Timer = (props) => {
  function parseTime(time) {
    return time < 10 ? '0' + time : time;
  }

  const { time } = props;

  const timer = {
    fontSize: '6rem',
    textAlign: 'center',
    '@media (max-width: 550px)': {
      fontSize: '4rem'
    },
  };

  return (
    <div style={timer} className="timer">
      <h1>{parseTime(time.minutes)}:{parseTime(time.seconds)}</h1>
    </div>
  );
};

export default Radium(Timer);
