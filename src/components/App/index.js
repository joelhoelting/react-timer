import React, { Component } from 'react';

// Import Components
import Header from '../Header';
import TimerWindow from '../TimerWindow';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.openSettings = this.openSettings.bind(this);
  }

  openSettings() {
    alert('Settings Opened');
  }

  setPomodoro() {
    alert('Set Pomodoro!');
  }

  setShortBreak() {
    alert('Set Short Break!');
  }

  setLongBreak() {
    alert('Set Long Break!');
  }

  render() {
    return (
      <div className="container">
        <Header openSettings={this.openSettings} />
        <TimerWindow
          setPomodoro={this.setPomodoro}
          setShortBreak={this.setShortBreak}
          setLongBreak={this.setLongBreak}
        />
      </div>
    );
  }
}

export default App;
