import React, { Component } from 'react';
import Modal from 'react-modal';

// Import Components
import Header from '../Header';
import TimerWindow from '../TimerWindow';

import './App.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      'modalIsOpen': false,
      'timer': 25,
      'settings': {
        'pomodoro': 25,
        'short': 5,
        'long': 10
      }
    };

    this.openSettings = this.openSettings.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default App;
