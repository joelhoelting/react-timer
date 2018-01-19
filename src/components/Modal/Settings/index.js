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

  const styles = {
    select: {
      width: '100%'
    },
    input: {
      width: '50px'
    },
    closeButton: {
      float: 'right'
    }
  };

  const { pomodoro, long, short } = props.state.settings;
  const { select, input } = styles;

  return (
    <div>

      <h3>Pick Alert Sound</h3>
      <select id="alert" defaultValue={props.state.settings.alert} style={select} size="5" onChange={(event) => setSound(event)}>
        <option value="alarm_clock">Alarm Clock</option>
        <option value="applause_cheers">Applause & Cheers</option>
        <option value="foghorn_barge">Foghorn Barge</option>
        <option value="old_bell">Old Bell</option>
        <option value="ship_brass">Ship Brass</option>
      </select>
      <h3>Volume</h3>
      <select id="volume" defaultValue={props.state.settings.volume} style={select} size="10" onChange={(event) => setVolume(event)}>
        <option value="1">10%</option>
        <option value="2">20%</option>
        <option value="3">30%</option>
        <option value="4">40%</option>
        <option value="5">50%</option>
        <option value="6">60%</option>
        <option value="7">70%</option>
        <option value="8">80%</option>
        <option value="9">90%</option>
        <option value="10">100%</option>
      </select>
      <h3>Set Custom Times (in minutes)</h3>
      <label>Pomodoro</label>
      <input style={input} step="1" min="1" name="pomodoro" type="number" defaultValue={pomodoro} onChange={(event) => setTimerSettings(event)} />
      <label>Short Break</label>
      <input style={input} step="1" min="1" name="short" type="number" defaultValue={short} onChange={(event) => setTimerSettings(event)} />
      <label>Long Break</label>
      <input style={input} step="1" min="1" name="long" type="number" defaultValue={long} onChange={(event) => setTimerSettings(event)} />
      <button>Set Defaults</button>
    </div>
  );
};

export default Settings;
