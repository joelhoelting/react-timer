import React from 'react';

import './PomodoroController.css';

const PomodoroController = (props) => {
  function handleChange(event) {
    const selection = event.target.name;
    props.setTimer(selection);
  }

  return (
    <div className="pomodoroController">
      <button name="pomodoro" onClick={(event) => handleChange(event)}>Pomodoro</button>
      <button name="short" onClick={(event) => handleChange(event)}>Short Break</button>
      <button name="long" onClick={(event) => handleChange(event)}>Long Break</button>
    </div>
  );
};


export default PomodoroController;
