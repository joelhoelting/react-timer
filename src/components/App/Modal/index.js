import React from 'react';
import Radium from 'radium';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import './Modal.css';

const Modal = (props) => {

  const modal = {
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      zIndex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    container: {
      borderRadius: '5px',
      border: '4px solid #565656',
      padding: '30px',
      width: '80%',
      maxWidth: '600px',
      background: '#fff',
      '@media (max-width: 650px)': {
        padding: '20px',
      },
    },
    close: {
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
        <div style={modal.base} className="modal">
          <div style={modal.container} className="modal-container" >
            <button style={modal.close} className="close-modal" onClick={props.closeModal}>&#10005;</button>
            {props.children}
          </div>
        </div>
      </CSSTransitionGroup>
    );
  } else {
    return (
      <CSSTransitionGroup
        transitionName={props.transitionName}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
      </CSSTransitionGroup>
    );
  }
};

export default Radium(Modal);
