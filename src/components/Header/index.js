import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';
import gear from './gear.png';

const Header = (props) => {
  return (
    <header>
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
