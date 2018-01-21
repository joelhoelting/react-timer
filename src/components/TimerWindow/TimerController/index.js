import React from 'react';

const TimerController = (props) => {
  const { startTimer, stopTimer, resetTimer } = props;

  const style = {
    base: {
      display: 'flex',
      'justifyContent': 'space-around',
    },
    button: {
      width: '20%',
      height: '75px'
    }
  };

  return (
    <div style={style.base} className="timerController">
      <button style={style.button} onClick={startTimer}>Start</button>
      <button style={style.button} onClick={stopTimer}>Stop</button>
      <button style={style.button} onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default TimerController;
