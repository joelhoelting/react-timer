import React, { Component } from 'react';

// Import Components
import Header from '../Header';

import TimerWindow from '../TimerWindow';

import Modal from '../Modal';
import Settings from '../Modal/Settings';
import AudioFiles from '../AudioFiles';

// Import CSS
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.defaultValues = {
      isSettingsModalOpen: false,
      activeMode: 'pomodoro',
      time: {
        minutes: 25,
        seconds: 0,
        remainingSeconds: 1500
      },
      settings: {
        pomodoro: 25,
        short: 5,
        long: 10,
        alert: 'alarm_clock',
        volume: 3
      }
    };

    // Initial State
    this.state = this.defaultValues;

    // Global Variables
    this.timer = 0;


    // This Bindings
    this.openSettingsModal = this.openSettingsModal.bind(this);
    this.closeSettingsModal = this.closeSettingsModal.bind(this);
    this.changeSound = this.changeSound.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.changeTimerSettings = this.changeTimerSettings.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.setDefaults = this.setDefaults.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.assignKeys = this.assignKeys.bind(this);
  }

  componentWillMount() {
    // Check LocalStorage Before App is Rendered and Set State
    // Will Not Run First Time Page is Loaded
    if (localStorage.length > 0) {
      this.setState({
        time: {
          ...this.state.time,
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

  componentDidMount() {
    // After Component Mounts Set Local Storage to Default State
    const settings = this.state.settings;
    for (var key in settings) {
      if (settings.hasOwnProperty(key)) {
        localStorage.setItem(key, settings[key]);
      }
    }
    // Bind Events
    this.bindEvents();
  }

  // Open Settings Modal
  openSettingsModal() {
    this.setState({ isSettingsModalOpen: true });
  }

  // Close Settings Modal
  closeSettingsModal() {
    this.setState({ isSettingsModalOpen: false });
  }

  /* Sound Functions */

  // Finds HTML5 Audio Element in the DOM and Plays It (Two Parameters: Alert, Volume)
  playSound(alert = this.state.settings.alert, volume = this.state.settings.volume) {
    const soundArray = Array.from(document.querySelectorAll('audio'));
    // Audio Pauses When Selecting Another Alert
    for (var i = 0; i < soundArray.length; i++) {
      soundArray[i].pause();
      soundArray[i].currentTime = 0;
    }

    // Find Sound Based on Alert Name
    const sound = soundArray.find(sound => sound.src.includes(alert));
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
        time: {
          seconds: 0,
          minutes: parseInt(minutes, 10),
          remainingSeconds: (parseInt(minutes, 10) * 60)
        }
      });
    }

    // Persist Timer Setting to LocalStorage
    localStorage.setItem(setting, minutes);
  }

  setDefaults() {
    const defaults = this.defaultValues;
    defaults.isSettingsModalOpen = true;
    // Set State to Default Values
    this.setState(defaults);
    const settings = defaults.settings;
    // Set Local Storage to Default Values
    for (var key in settings) {
      localStorage.setItem(key, settings[key]);
    }
    document.title = 'React Timer';
  }

  // Update State for ActiveMode(Pomodoro, Short, Long) and Displayed Timer
  setTimer(selection) {
    // Stop Timer
    this.stopTimer();
    // Case Statement -- Set Timer to Match State.Settings Based on Which Button is Clicked (Pomodoro/Short/Long)
    let time;
    switch (selection) {
    case 'pomodoro':
      time = this.state.settings.pomodoro;
      this.setState({activeMode: selection});
      break;
    case 'short':
      time = this.state.settings.short;
      this.setState({activeMode: selection});
      break;
    case 'long':
      time = this.state.settings.long;
      this.setState({activeMode: selection});
      break;
    default:
      break;
    }

    // Always Update Timer When User Changes ActiveMode( Pomodoro, Short, Long )
    this.setState({
      time: {
        seconds: 0,
        remainingSeconds: (time * 60),
        minutes: time
      }
    });
  }

  /* Timer Functions */

  // Returns an Object w/ Minutes and Seconds Based on Remaining Seconds
  secondsToTime(secs){
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs % 60);

    let obj = {
      minutes,
      seconds
    };
    return obj;
  }

  // Decrements Remaining Seconds by 1 Each Time It's Executed
  countDown() {
    let seconds = this.state.time.remainingSeconds - 1;
    let timeObject = this.secondsToTime(seconds);
    timeObject.remainingSeconds = seconds;

    // Timer Gets Updated w/ Remaining Minutes, Seconds, Total Seconds Remaining
    this.setState({
      time: timeObject
    });

    // Parse Numbers and Update Time in HTML Title
    function parseTime(number) {
      return number < 10 ? `0${number}` : number;
    }
    document.title = `(${parseTime(timeObject.minutes)}:${parseTime(timeObject.seconds)}) React Timer`;

    // Once Timer Reaches 0 Execute Code Below
    if (seconds === 0) {
      // Set Document Title Back to Default
      document.title = 'Time Up! - React Timer';
      // Remove setInterval on Timer
      clearInterval(this.timer);
      // Set Timer Back to Default (sans setInterval)
      this.timer = 0;

      // Play Sound n Number of Times
      let playThroughs = 2;
      let thisRef = this;
      // Play Sound One Time Before setInterval
      this.playSound();
      // Set Interval Based on Number of Playthroughs
      let player = setInterval(function(){
        if(playThroughs > 0){
          thisRef.playSound();
          playThroughs--;
        } else {
          clearInterval(player);
          document.title = 'React Timer';
        }
      }, 5000);
    }
  }

  // Start Timer
  startTimer() {
    // Timer Only Starts if setInterval Isn't Active
    if (this.timer === 0) {
      // this.timer gets set to an interval object
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  // Stop Timer
  stopTimer() {
    if (this.timer !== 0) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }

  // Reset Timer
  resetTimer() {
    this.stopTimer();
    const { activeMode } = this.state;
    const time = this.state.settings[activeMode];
    this.setState({
      time: {
        seconds: 0,
        remainingSeconds: (time * 60),
        minutes: time
      }
    });
    // Set HTML Title to Default
    document.title = 'React Timer';
  }

  // Bind Events
  bindEvents() {
    document.addEventListener('keypress', this.assignKeys);
  }

  // Assign Keyboard Hotkeys
  assignKeys(event) {
    switch(event.which) {
    case 32:
      this.timer !== 0 ? this.stopTimer() : this.startTimer();
      break;
    case 0:
      if (this.state.isSettingsModalOpen) {
        this.setState({ isSettingsModalOpen: false });
      }
      break;
    default:
      break;
    }
  }

  render() {
    return (
      <div className="container">
        <Header openSettings={this.openSettingsModal} />
        <TimerWindow
          setTimer={this.setTimer}
          time={this.state.time}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          resetTimer={this.resetTimer}
          activeMode={this.state.activeMode}
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
            setDefaults={this.setDefaults}
            state={this.state}
          />
        </Modal>
        <AudioFiles />
      </div>
    );
  }
}

export default App;
