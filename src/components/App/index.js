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
      'isModalOpen': false,
      'timer': 25,
      'settings': {
        'pomodoro': 25,
        'short': 5,
        'long': 10,
        'volume': 10
      }
    };

    // This Bindings
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.playSound = this.playSound.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  // Open Close Modal
  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  // Sound Functions
  playSound(fileName, volume) {
    const soundArray = Array.from(document.querySelectorAll('audio'));
    for (var i = 0; i < soundArray.length; i++) {
      soundArray[i].pause();
    }
    const sound = soundArray.find(sound => sound.src.includes(fileName));
    sound.volume = volume / 10;
    sound.play();
  }

  changeVolume(volume) {
    this.setState({
      settings: {
        ...this.state.settings,
        volume: volume
      }
    });
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
          playSound={this.playSound}
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
