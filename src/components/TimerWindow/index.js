import React from 'react';

import PomodoroController from './PomodoroController';
import Timer from './Timer';

const TimerWindow = (props) => {
  const { setPomodoro, setShortBreak, setLongBreak } = props;

  return (
    <div className="timerWindow">
      <PomodoroController
        setPomodoro={setPomodoro}
        setShortBreak={setShortBreak}
        setLongBreak={setLongBreak}
      />
      <Timer />
    </div>
  );
};

export default TimerWindow;
