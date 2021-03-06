import React, { Component } from 'react';
import Raven from 'raven-js';
// Radium for Component Styles
import Radium, {StyleRoot, Style} from 'radium';
// Header
import Header from './Header';
// Timer Window and Child Components
import TimerWindow from './TimerWindow';
// Import Pulse
import Pulse from './Pulse';
// Modal & Settings Component
import Modal from './Modal';
import Settings from './Modal/Settings';
// Audio Files
import AudioFiles from './AudioFiles';

Raven.config('https://98787a50be8945f5a2108bd3710f303f@sentry.io/300185').install();

class App extends Component {
  constructor() {
    super();

    this.defaultValues = {
      isSettingsModalOpen: false,
      activeMode: 'pomodoro',
      activeTimer: false,
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
        volume: 2
      },
      log: {
        pomodoro: 0,
        short: 0,
        long: 0
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

  checkLocalStorage() {
    var test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
  }

  componentWillMount() {
    // Check LocalStorage Before App is Rendered and Set State
    // Will Not Run First Time Page is Loaded
    if (this.checkLocalStorage() && localStorage.length > 0) {
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
    if (this.checkLocalStorage()) {
      const settings = this.state.settings;
      for (var key in settings) {
        if (settings.hasOwnProperty(key)) {
          localStorage.setItem(key, settings[key]);
        }
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

    // Don't Play Sound if User Changes Volume to 0
    if (volume === 0) {
      return;
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
    if (this.checkLocalStorage()) { localStorage.setItem('alert', alertName);}

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
    if (this.checkLocalStorage()) {localStorage.setItem('volume', newVolume);}
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
    if (this.checkLocalStorage()) {localStorage.setItem(setting, minutes);}
  }

  setDefaults() {
    const defaults = this.defaultValues;
    defaults.isSettingsModalOpen = true;
    // Set State to Default Values
    this.setState(defaults);
    const settings = defaults.settings;
    // Set Local Storage to Default Values
    if (this.checkLocalStorage()) {
      for (var key in settings) {
        localStorage.setItem(key, settings[key]);
      }
    }

  }

  // Update State for ActiveMode(Pomodoro, Short, Long) and Displayed Timer
  setTimer(selection) {
    // Reset Document Title
    document.title = 'React Timer';
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

    // Parse Numbers and Update Time in HTML Title
    function parseTime(number) {
      return number < 10 ? `0${number}` : number;
    }
    document.title = `(${parseTime(timeObject.minutes)}:${parseTime(timeObject.seconds)}) React Timer`;

    // Timer Gets Updated w/ Remaining Minutes, Seconds, Total Seconds Remaining
    this.setState({
      time: timeObject
    });

    // Once Timer Reaches 0 Execute Code Below
    if (seconds === 0) {
      // Set Document Title Back to Default
      document.title = 'Time Up! - React Timer';
      // Stop and Reset Timer
      this.stopTimer();
      this.resetTimer();

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
      this.logProgressSetTimer();
    }
  }

  // Function to Log and Keep Track of User Progress
  // Timer Settings Change Based on Progress

  logProgressSetTimer() {
    const activeMode = this.state.activeMode;
    let counterProgress = this.state.log[activeMode] + 1;
    this.setState({
      log: {
        ...this.state.log,
        [activeMode]: counterProgress
      }
    });
    if (activeMode === 'pomodoro') {
      if (this.state.log[activeMode] % 4 === 0) {
        this.setState({activeMode: 'long'});
        this.setTimer('long');
      } else {
        this.setState({activeMode: 'short'});
        this.setTimer('short');
      }
    } else {
      this.setState({activeMode: 'pomodoro'});
      this.setTimer('pomodoro');
    }
  }

  // Start Timer
  startTimer() {
    // Timer Only Starts if setInterval Isn't Active
    if (this.timer === 0) {
      // this.timer gets set to an interval object
      this.timer = setInterval(this.countDown, 1000);
    }
    // Set Active Timer State to True
    if (this.state.activeTimer === false) {
      this.setState({ activeTimer: true });
    }
    // Remove Focus From Button
    if (document.activeElement !== document.body) {
      document.activeElement.blur();
    }
  }

  // Stop Timer
  stopTimer() {
    if (this.timer !== 0) {
      clearInterval(this.timer);
      this.timer = 0;
    }

    // Set Active Timer State to False
    if (this.state.activeTimer === true) {
      this.setState({ activeTimer: false });
    }
    // Remove Focus From Button
    if (document.activeElement !== document.body) {
      document.activeElement.blur();
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
    document.title = 'React Timer';
  }

  // Bind Events
  bindEvents() {
    document.addEventListener('keydown', this.assignKeys);
  }

  // Assign Keyboard Hotkeys
  assignKeys(event) {
    switch(event.keyCode) {
    case 32:
      if (!this.state.isSettingsModalOpen) {
        this.timer !== 0 ? this.stopTimer() : this.startTimer();
      }
      break;
    case 27:
      if (this.state.isSettingsModalOpen) {
        this.setState({ isSettingsModalOpen: false });
      }
      break;
    default:
      break;
    }
  }

  render() {
    const global = {
      // Body
      'body': {
        fontFamily: 'Anonymous Pro, sans-serif',
        fontSize: '20px',
        margin: 0,
        padding: 0
      },
      button: {
        fontFamily: 'Anonymous Pro, sans-serif',
        fontWeight: '700'
      },
      // Button Globals
      'button:active': {
        outline: 'none'
      },
      'button:focus': {
        outline: 'none'
      },
      'button:hover': {
        cursor: 'pointer'
      }
    };

    // Container Styling
    const container = {
      margin: '0 auto',
      maxWidth: '960px',
      width: '90%',
      height: '99vh',
    };

    return (
      <StyleRoot>
        <Style rules={global} />
        <div style={container} className="container">
          <Header openSettings={this.openSettingsModal} />
          <TimerWindow
            setTimer={this.setTimer}
            time={this.state.time}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
            resetTimer={this.resetTimer}
            activeMode={this.state.activeMode}
            activeTimer={this.state.activeTimer}
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
        <Pulse activeTimer={this.state.activeTimer}/>
      </StyleRoot>
    );
  }
}

export default Radium(App);
