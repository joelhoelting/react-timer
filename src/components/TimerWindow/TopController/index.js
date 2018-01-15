import React from 'react';

import './TopController.css';

const TopController = (props) => {
  const { setPomodoro, setShortBreak, setLongBreak } = props;
  debugger

  return (
    <div className="topController">
      <button onClick={setPomodoro}>Pomodoro</button>
      <button onClick={setShortBreak}>Short Break</button>
      <button onClick={setLongBreak}>Long Break</button>
    </div>
  );
};


export default TopController;
