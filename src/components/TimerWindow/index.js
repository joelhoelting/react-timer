import React from 'react';

import PomodoroController from './PomodoroController';
import Timer from './Timer';
import TimerController from './TimerController';

const TimerWindow = (props) => {
  const { setPomodoro, setShortBreak, setLongBreak, startTimer, stopTimer, resetTimer } = props;

  return (
    <div className="timerWindow">
      <PomodoroController
        setPomodoro={setPomodoro}
        setShortBreak={setShortBreak}
        setLongBreak={setLongBreak}
      />
      <Timer />
      <TimerController
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
      />
    </div>
  );
};

export default TimerWindow;
