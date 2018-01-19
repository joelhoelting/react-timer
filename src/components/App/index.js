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
      activeMode: 'pomodoro',
      timer: {
        minutes: 25,
        seconds: 0,
        remainingSeconds: 1500
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
        timer: {
          ...this.state.timer,
          minutes: parseInt(localStorage.pomodoro, 10),
          remainingSeconds: (parseInt(localStorage.pomodoro, 10) * 60)
        },
        settings: {
          pomodoro: parseInt(localStorage.pomodoro, 10),
          short: parseInt(localStorage.short, 10),
          long: parseInt(localStorage.long, 10),
          alert: localStorage.alert,
          volume: parseInt(localStorage.volume, 10)
        },
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

  // Open Settings Modal
  openSettingsModal() {
    this.setState({ isSettingsModalOpen: true });
  }

  // Close Settings Modal
  closeSettingsModal() {
    this.setState({ isSettingsModalOpen: false });
  }

  // Sound Functions
  // Finds HTML5 Audio Element in the DOM and Plays It (Two Parameters: Alert Name, Volume)
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

  changeTimerSettings(setting, minutes) {

    // Set State After User Changes Timer Settings
    this.setState({
      settings: {
        ...this.state.settings,
        [setting]: minutes
      }
    });

    // Update Timer if Setting Being Changed (Pomodoro, Short, Long) === ActiveMode (Pomodoro, Short, Long)
    if (setting === this.state.activeMode) {
      this.setState({
        timer: {
          seconds: 0,
          minutes: parseInt(minutes, 10),
          remainingSeconds: (parseInt(minutes, 10) * 60)
        }
      });
    }

    // Persist Timer Setting to LocalStorage
    localStorage.setItem(setting, minutes);
  }

  // Method to Update State for ActiveMode(Pomodoro, Short, Long) and Displayed Timer
  setTimer(selection) {
    // Case Statement -- Set Timer to Match State.Settings Based on Which Button is Clicked (Pomodoro/Short/Long)
    let time;
    switch (selection) {
    case 'pomodoro':
      time = this.state.settings.pomodoro;
      this.setState({ activeMode: selection});
      break;
    case 'short':
      time = this.state.settings.short;
      this.setState({ activeMode: selection});
      break;
    case 'long':
      time = this.state.settings.long;
      this.setState({ activeMode: selection});
      break;
    default:
      break;
    }

    // Always Update Timer When User Changes ActiveMode(Pomodoro, Short, Long)
    this.setState({
      timer: {
        ...this.state.timer,
        remainingSeconds: (time * 60),
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
