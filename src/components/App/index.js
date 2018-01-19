import React, { Component } from 'react';

// Import Components
import Header from '../Header';

import TimerWindow from '../TimerWindow';

import Modal from '../Modal';
import Settings from '../Modal/Settings';
import AudioFiles from '../AudioFiles';

// Import Global Stylesheet
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isSettingsModalOpen: false,
      timer: {
        minutes: 25,
        seconds: 0,
      },
      settings: {
        pomodoro: 25,
        short: 5,
        long: 10,
        alert: 'alarm_clock',
        volume: 5
      }
    };

    // This Bindings
    this.openSettingsModal = this.openSettingsModal.bind(this);
    this.closeSettingsModal = this.closeSettingsModal.bind(this);
    this.changeSound = this.changeSound.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.changeTimerSettings = this.changeTimerSettings.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  //
  componentWillMount() {
    // Check LocalStorage Before App Rendered and Set State
    // Will Not Run First Time Page is Loaded
    if (localStorage.length > 0) {
      this.setState({
        settings: {
          pomodoro: parseInt(localStorage.pomodoro, 10),
          short: parseInt(localStorage.short, 10),
          long: parseInt(localStorage.long, 10),
          alert: localStorage.alert,
          volume: parseInt(localStorage.volume, 10)
        }
      });
    }
  }

  // After Component Mounts Set Local Storage to Default State
  componentDidMount() {
    const settings = this.state.settings;

    for (var key in settings) {
      if (settings.hasOwnProperty(key)) {
        localStorage.setItem(key, settings[key]);
      }
    }
  }

  // Open Close Modal
  openSettingsModal() {
    this.setState({ isSettingsModalOpen: true });
  }

  closeSettingsModal() {
    this.setState({ isSettingsModalOpen: false });
  }

  // Sound Functions

  playSound(alertName, volume) {
    const soundArray = Array.from(document.querySelectorAll('audio'));
    // Audio Pauses When Selecting Another Alert
    for (var i = 0; i < soundArray.length; i++) {
      soundArray[i].pause();
      soundArray[i].currentTime = 0;
    }
    const sound = soundArray.find(sound => sound.src.includes(alertName));
    sound.volume = volume / 10;
    sound.play();
  }

  changeSound(alertName) {
    // Set State After User Selects Alert
    this.setState({
      settings: {
        ...this.state.settings,
        alert: alertName
      }
    });
    // Persist Alert Selection to LocalStorage
    localStorage.setItem('alert', alertName);
    // Play Sound
    this.playSound(alertName, this.state.settings.volume);
  }

  changeVolume(volume) {
    var newVolume = parseInt(volume, 10);
    // Set State After User Selects Volume
    this.setState({
      settings: {
        ...this.state.settings,
        volume: newVolume
      }
    });
    // Persist Alert Selection to LocalStorage
    localStorage.setItem('volume', newVolume);
    // Play Sound
    this.playSound(this.state.settings.alert, newVolume);
  }

  changeTimerSettings(setting, value) {
    // Set State After User Changes Timer Settings
    this.setState({
      settings: {
        ...this.state.settings,
        [setting]: value
      }
    });
    // Persist Timer Setting to LocalStorage
    localStorage.setItem(setting, value);
  }

  setTimer(selection) {
    let time;
    switch (selection) {
    case 'pomodoro':
      time = this.state.settings.pomodoro;
      break;
    case 'short':
      time = this.state.settings.short;
      break;
    case 'long':
      time = this.state.settings.long;
      break;
    default:
      break;
    }
    this.setState({
      timer: {
        ...this.state.timer,
        minutes: time
      }
    });
  }

  startTimer() {
    alert('Start Timer!');
  }

  stopTimer() {
    alert('Stopped Timer!');
  }

  resetTimer() {
    alert('Reset Timer!');
  }

  render() {
    return (
      <div className="container">
        <Header openSettings={this.openSettingsModal} />
        <TimerWindow
          setTimer={this.setTimer}
          timer={this.state.timer}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          resetTimer={this.resetTimer}
        />
        <Modal
          isOpen={this.state.isSettingsModalOpen}
          closeModal={this.closeSettingsModal}
          transitionName="modal-animate"
        >
          <Settings
            changeSound={this.changeSound}
            changeVolume={this.changeVolume}
            changeTimerSettings={this.changeTimerSettings}
            state={this.state}
          />
        </Modal>
        <AudioFiles />
      </div>
    );
  }
}

export default App;
