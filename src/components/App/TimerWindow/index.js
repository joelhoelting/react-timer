import React from 'react';

import PomodoroController from './PomodoroController';
import Timer from './Timer';
import TimerController from './TimerController';

const TimerWindow = (props) => {
  const {
    activeMode,
    activeTimer,
    setTimer,
    startTimer,
    stopTimer,
    resetTimer,
    time
  } = props;

  return (
    <div className="timerWindow">
      <PomodoroController
        activeMode={activeMode}
        setTimer={setTimer}
      />
      <Timer time={time}/>
      <TimerController
        activeTimer={activeTimer}
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
      />
    </div>
  );
};

export default TimerWindow;
