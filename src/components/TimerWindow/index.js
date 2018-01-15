import React from 'react';

import PomodoroController from './PomodoroController';
import Timer from './Timer';
import TimerController from './TimerController';

const TimerWindow = (props) => {
  const { setPomodoro, setShortBreak, setLongBreak, startTimer, stopTimer, resetTimer, timer } = props;

  return (
    <div className="timerWindow">
      <PomodoroController
        setPomodoro={setPomodoro}
        setShortBreak={setShortBreak}
        setLongBreak={setLongBreak}
      />
      <Timer timer={props.timer}/>
      <TimerController
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
      />
    </div>
  );
};

export default TimerWindow;
