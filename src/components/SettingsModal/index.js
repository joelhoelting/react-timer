import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import './SettingsModal.css';

const SettingsModal = (props) => {
  const style = {
    select: {
      width: '100%'
    },
    closeButton: {
      float: 'right'
    }
  };

  if(props.isOpen){
    return (
      <CSSTransitionGroup
        transitionName={props.transitionName}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div className="modal">
          <div className="modal-container">
            <button style={style.closeButton} onClick={props.closeModal}>&#10005;</button>
            <form action="" className="settings" onSubmit={(event) => this.saveSettings(event)}>
              <h3>Pick Alert Sound</h3>
              <select style={style.select} size="5" ref={(input) => { this.alert = input}}>
                <option value="1">Option 1</option>
                <option value="2">Option 1</option>
                <option value="3">Option 1</option>
                <option value="4">Option 1</option>
              </select>
              <h3>Volume</h3>
              <select style={style.select} size="5" ref={(input) => { this.volume = input}}>
                <option value="1">25%</option>
                <option value="2">50%</option>
                <option value="3">75%</option>
                <option value="4">100%</option>
              </select>
              <button style={style.saveButton} type="submit">Save</button>
              <button type="submit">Reset</button>
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
