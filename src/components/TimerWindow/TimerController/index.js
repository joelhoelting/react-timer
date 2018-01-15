import React from 'react';

import './TimerController.css';

const TimerController = (props) => {
  const { startTimer, stopTimer, resetTimer } = props;
  return (
    <div className="timerController">
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default TimerController;
