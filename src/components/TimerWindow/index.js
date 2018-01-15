import React from 'react';

import TopController from './TopController';

const TimerWindow = (props) => {
  const { setPomodoro, setShortBreak, setLongBreak } = props;
  
  return (
    <div className="timerWindow">
      <TopController
        setPomodoro={setPomodoro}
        setShortBreak={setShortBreak}
        setLongBreak={setLongBreak}
      />
    </div>
  );
};

export default TimerWindow;
