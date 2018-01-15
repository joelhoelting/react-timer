import React from 'react';

import './PomodoroController.css';

const PomodoroController = (props) => {
  const { setPomodoro, setShortBreak, setLongBreak } = props;

  return (
    <div className="pomodoroController">
      <button onClick={setPomodoro}>Pomodoro</button>
      <button onClick={setShortBreak}>Short Break</button>
      <button onClick={setLongBreak}>Long Break</button>
    </div>
  );
};


export default PomodoroController;
