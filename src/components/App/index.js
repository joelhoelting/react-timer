import React, { Component } from 'react';

// Import Components
import Header from '../Header';
import TimerWindow from '../TimerWindow';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      'timer': 25,
      'settings': {
        'pomodoro': 25,
        'short': 5,
        'long': 10
      }
    };

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

  startTimer() {
    alert('Timer Started!');
  }

  stopTimer() {
    alert('Timer Stopped!');
  }

  resetTimer() {
    alert('Timer Reset!');
  }

  render() {
    return (
      <div className="container">
        <Header openSettings={this.openSettings} />
        <TimerWindow
          setPomodoro={this.setPomodoro}
          setShortBreak={this.setShortBreak}
          setLongBreak={this.setLongBreak}
          timer={this.state.timer}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          resetTimer={this.resetTimer}
        />
      </div>
    );
  }
}

export default App;
