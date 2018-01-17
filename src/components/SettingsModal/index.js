import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import './SettingsModal.css';

const SettingsModal = (props) => {

  function selectSound(event) {
    props.changeSound(event.target.value);
  }

  function selectVolume(event) {
    props.changeVolume(event.target.value);
  }

  const styles = {
    modal: {
      // Flexbox - Center Modal
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      /* Stay in Place */
      zIndex: 1,
      /* Sit on Top */
      left: 0,
      top: 0,
      width: '100%',
      /* Full Width */
      height: '100%',
      /* Full Height */
      overflow: 'none',
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
            <h3>Pick Alert Sound</h3>
            <select id="alert" defaultValue={props.state.settings.alert} style={select} size="5" onChange={(event) => selectSound(event)}>
              <option value="alarm_clock">Alarm Clock</option>
              <option value="applause_cheers">Applause & Cheers</option>
              <option value="foghorn_barge">Foghorn Barge</option>
              <option value="old_bell">Old Bell</option>
              <option value="ship_brass">Ship Brass</option>
            </select>
            <h3>Volume</h3>
            <select id="volume" defaultValue={props.state.settings.volume} style={select} size="10" onChange={(event) => selectVolume(event)}>
              <option value="1">10%</option>
              <option value="2">20%</option>
              <option value="3">30%</option>
              <option value="4">40%</option>
              <option value="5">50%</option>
              <option value="6">60%</option>
              <option value="7">70%</option>
              <option value="8">80%</option>
              <option value="9">90%</option>
              <option value="10">100%</option>
            </select>
            <h3>Set Custom Times (in minutes)</h3>
            <label>Pomodoro</label>
            <input style={input} step="1" min="1" name="pomodoro" type="number" defaultValue={pomodoro} />
            <label>Short Break</label>
            <input style={input} step="1" min="1" name="long" type="number" defaultValue={short} />
            <label>Long Break</label>
            <input style={input} step="1" min="1" name="short" type="number" defaultValue={long} />
            <button>Set Defaults</button>
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
