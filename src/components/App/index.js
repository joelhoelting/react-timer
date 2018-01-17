import React, { Component } from 'react';

// Import Components
import Header from '../Header';
import TimerWindow from '../TimerWindow';
import SettingsModal from '../SettingsModal';
import AudioFiles from '../AudioFiles';

// Import Global Stylesheet
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isModalOpen: false,
      timer: 25,
      settings: {
        pomodoro: 25,
        short: 5,
        long: 10,
        alert: 'alarm_clock',
        volume: 5
      }
    };

    // This Bindings
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeSound = this.changeSound.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
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
  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
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

  setPomodoro() {
    alert('Start Timer!');
  }

  setShortBreak() {
    alert('Start Timer!');
  }

  setLongBreak() {
    alert('Start Timer!');
  }

  setTimer() {
    alert('Start Timer!');
  }

  startTimer() {
    alert('Set Pomodoro!');
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
          changeSound={this.changeSound}
          changeVolume={this.changeVolume}
          transitionName="modal-animate"
          state={this.state}
        />
        <AudioFiles />
      </div>
    );
  }
}

export default App;
