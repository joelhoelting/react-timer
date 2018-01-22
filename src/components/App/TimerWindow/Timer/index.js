import React from 'react';
import Radium from 'radium';

const Timer = (props) => {
  function parseTime(time) {
    return time < 10 ? '0' + time : time;
  }

  const { time } = props;

  const timer = {
    base: {
      fontSize: '10rem',
      textAlign: 'center',
      '@media (max-width: 1400px)': {
        fontSize: '5rem'
      },
      '@media (max-width: 550px)': {
        fontSize: '4rem'
      },
    }
  };

  return (
    <div className="timer">
      <h1 style={timer.base}>{parseTime(time.minutes)}:{parseTime(time.seconds)}</h1>
    </div>
  );
};

export default Radium(Timer);
