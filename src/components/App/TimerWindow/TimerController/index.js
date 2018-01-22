import React from 'react';
import Radium from 'radium';

const TimerController = (props) => {
  const { activeTimer, startTimer, stopTimer, resetTimer } = props;

  const style = {
    base: {
      display: 'flex',
      'justifyContent': 'space-around',
    },
    button: {
      width: '20%',
      height: '75px',
      '@media (max-width: 550px)': {
        width: '33%'
      },
    }
  };

  return (
    <div style={style.base} className="timerController">
      <button className={activeTimer === true ? 'active' : 'inactive'} style={style.button} onClick={startTimer}>Start</button>
      <button className={activeTimer === false ? 'active' : 'inactive'} style={style.button} onClick={stopTimer}>Stop</button>
      <button style={style.button} onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Radium(TimerController);
