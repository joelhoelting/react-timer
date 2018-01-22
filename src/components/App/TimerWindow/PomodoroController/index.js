import React from 'react';
import Radium, {Style} from 'radium';

const PomodoroController = (props) => {
  // Detect Which Button is Clicked and Pass Value to setTimer()
  function handleChange(event) {
    const selection = event.target.name;
    props.setTimer(selection);
  }

  const { activeMode } = props;

  const style = {
    base: {
      display: 'flex',
      justifyContent: 'space-around',
      margin: '20px 0'
    },
    button: {
      width: '33%',
      height: '50px'
    }
  };

  const activeButton = {
    'button.active': {
      background: '#274060',
      borderRadius: '5px',
      border: 'none',
      color: 'white'
    }
  };


  return (
    <div style={style.base} className="pomodoroController">
      <Style rules={activeButton} />
      <button
        key="pomodoro"
        style={style.button}
        className={activeMode === 'pomodoro' ? 'active' : 'inactive'}
        name="pomodoro"
        onClick={(event) => handleChange(event)}
      >
        Pomodoro
      </button>
      <button
        key="short"
        style={style.button}
        className={activeMode === 'short' ? 'active' : 'inactive'}
        name="short"
        onClick={(event) => handleChange(event)}
      >
        Short Break
      </button>
      <button
        key="long"
        style={style.button}
        className={activeMode === 'long' ? 'active' : 'inactive'}
        name="long" onClick={(event) => handleChange(event)}
      >
        Long Break
      </button>
    </div>
  );
};


export default Radium(PomodoroController);
