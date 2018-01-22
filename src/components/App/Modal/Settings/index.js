import React from 'react';

const Settings = (props) => {

  function setSound(event) {
    props.changeSound(event.target.value);
  }

  function setVolume(event) {
    props.changeVolume(event.target.value);
  }

  function setTimerSettings(event) {
    const setting = event.target.name;
    const value = parseInt(event.target.value, 10);
    props.changeTimerSettings(setting, value);
  }

  function setDefaults() {
    props.setDefaults();
  }

  const { pomodoro, long, short, volume, alert } = props.state.settings;

  const form = {
    select: {
      width: '100%'
    },
    inputNumber: {
      width: '50px'
    },
    inputRange: {
      width: '100%'
    }
  };

  return (
    <div>
      <h3>Set Custom Times (minutes)</h3>
      <label>Pomodoro: </label>
      <input style={form.inputNumber} type="number" step="1" min="1" name="pomodoro" value={pomodoro} onChange={(event) => setTimerSettings(event)} />
      <label>Short Break: </label>
      <input style={form.inputNumber} type="number" step="1" min="1" name="short" value={short} onChange={(event) => setTimerSettings(event)} />
      <label>Long Break: </label>
      <input style={form.inputNumber} type="number" step="1" min="1" name="long" value={long} onChange={(event) => setTimerSettings(event)} />
      <h3>Pick Alert Sound</h3>
      <select style={form.select} id="alert" value={alert} size="5" onChange={(event) => setSound(event)}>
        <option value="alarm_clock">Alarm Clock</option>
        <option value="applause_cheers">Applause & Cheers</option>
        <option value="foghorn_barge">Foghorn Barge</option>
        <option value="old_bell">Old Bell</option>
        <option value="ship_brass">Ship Brass</option>
      </select>
      <h3>Volume: {volume}</h3>
      <input style={form.inputRange} type="range" value={volume} min="1" max="10" onChange={(event) => setVolume(event)} />
      <button onClick={() => setDefaults()} >Set Defaults</button>
    </div>
  );
};

export default Settings;
