import React from 'react';

import './PomodoroController.css';

const PomodoroController = (props) => {
  function handleChange(event) {
    const selection = event.target.name;
    props.setTimer(selection);
  }
  const { activeMode } = props;

  return (
    <div className="pomodoroController">
      <button
        className={activeMode === 'pomodoro' ? 'active' : 'inactive'}
        name="pomodoro"
        onClick={(event) => handleChange(event)}
      >
        Pomodoro
      </button>
      <button
        className={activeMode === 'short' ? 'active' : 'inactive'}
        name="short"
        onClick={(event) => handleChange(event)}
      >
          Short Break
      </button>
      <button
        className={activeMode === 'long' ? 'active' : 'inactive'}
        name="long" onClick={(event) => handleChange(event)}
      >
        Long Break
      </button>
    </div>
  );
};


export default PomodoroController;
