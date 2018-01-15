import React, { Component } from 'react';

import Header from '../Header';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.openSettings = this.openSettings.bind(this);
  }

  openSettings() {
    alert('Settings Opened');
  }

  render() {
    return (
      <div className="container">
        <Header openSettings={this.openSettings} />
      </div>
    );
  }
}

export default App;
