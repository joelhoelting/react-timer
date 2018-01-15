import React, { Component } from 'react';

// Import Components
import Header from '../Header';
import TimerWindow from '../TimerWindow';
import SettingsModal from '../SettingsModal';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      'isModalOpen': false,
      'timer': 25,
      'settings': {
        'pomodoro': 25,
        'short': 5,
        'long': 10
      }
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  openSettings() {
    alert('Settings Open!');
  }

  closeSettings() {
    alert('Settings Closed!');
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
        <Header openSettings={this.openModal} />
        <TimerWindow
          setPomodoro={this.setPomodoro}
          setShortBreak={this.setShortBreak}
          setLongBreak={this.setLongBreak}
          timer={this.state.timer}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          resetTimer={this.resetTimer}
        />
        <SettingsModal
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          transitionName="modal-animate"
        />
      </div>
    );
  }
}

export default App;
