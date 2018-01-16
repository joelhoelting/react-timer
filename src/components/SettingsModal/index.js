import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import './SettingsModal.css';

// Import Audio Files
import sound1 from 'sounds/sound1.mp3';

const SettingsModal = (props) => {

  function saveSettings(event) {
    event.preventDefault();

    console.log('state will be saved');
    // props.saveSettings();
  }

  const styles = {
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      /* Stay in place */
      zIndex: 1,
      /* Sit on top */
      left: 0,
      top: 0,
      width: '100%',
      /* Full width */
      height: '100%',
      /* Full height */
      overflow: 'none',
      /* Enable scroll if needed */
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    modalContainer: {
      padding: '20px',
      width: '95%',
      maxWidth: '600px',
      background: '#fff'
    },
    select: {
      width: '100%'
    },
    input: {
      width: '50px'
    },
    closeButton: {
      float: 'right'
    }
  };

  const { pomodoro, long, short } = props.state.settings;
  const { modal, modalContainer, select, input, closeButton } = styles;

  if(props.isOpen){
    return (
      <CSSTransitionGroup
        transitionName={props.transitionName}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div className="modal" style={modal}>
          <div className="modal-container" style={modalContainer}>
            <button style={closeButton} onClick={props.closeModal}>&#10005;</button>
            <form action="" className="settings" onSubmit={(event) => saveSettings(event)}>
              <h3>Pick Alert Sound</h3>
              <select style={select} size="4" ref={(input) => { this.alert = input}}>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </select>
              <h3>Volume</h3>
              <select style={select} size="4" ref={(input) => { this.volume = input}}>
                <option value="1">25%</option>
                <option value="2">50%</option>
                <option value="3">75%</option>
                <option value="4">100%</option>
              </select>
              <h3>Set Custom Times (in minutes)</h3>
              <label>Pomodoro</label>
              <input style={input} step="1" min="1" name="pomodoro" type="number" defaultValue={pomodoro} />
              <label>Short Break</label>
              <input style={input} step="1" min="1" name="long" type="number" defaultValue={short} />
              <label>Long Break</label>
              <input style={input} step="1" min="1" name="short" type="number" defaultValue={long} />
              <button type="submit">Save</button>
              <button>Reset</button>
            </form>
          </div>
        </div>
      </CSSTransitionGroup>
    );
  } else {
    return (
      <CSSTransitionGroup
        transitionName={props.transitionName}
        transitionEnterTimeout={100}
        transitionLeaveTimeout={100}>
      </CSSTransitionGroup>
    );
  }
};

export default SettingsModal;
