import React from 'react';
import PropTypes from 'prop-types';

import gear from './gear.png';

import './Header.css';

const Header = (props) => {
  var header = {
    base: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px'
    },
    title: {
      fontSize: '2rem'
    }
  };

  return (
    <header style={header.base}>
      <h1>React Timer</h1>
      <button onClick={props.openSettings} title="Settings">
        <img src={gear} alt="settings" />
      </button>
    </header>
  );
};

Header.propTypes = {
  openSettings: PropTypes.func.isRequired
};

export default Header;
