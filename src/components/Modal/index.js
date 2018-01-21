import React from 'react';
import Radium, {Style} from 'radium';
import CSSTransitionGroup from 'react-addons-css-transition-group';

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
      borderRadius: '10px',
      border: '3px solid black',
      padding: '20px',
      width: '90%',
      maxWidth: '600px',
      background: '#fff',
    },
    close: {
      float: 'right'
    }
  };

  const transitions= {
    '.modal-animate-enter': {
      opacity: 0,
      transition: 'opacity .2s linear'
    },
    '.modal-animate-enter-active': {
      opacity: 1
    },
    '.modal-animate-enter .modal-container': {
      transform: 'translateY(-130%)',
      opacity: 0,
      transition: 'all 0.3s ease .2s'
    },
    '.modal-animate-enter.modal-animate-enter-active .modal-container': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    '.modal-animate-leave .modal-container': {
      transform: 'translateY(0)',
      opacity: 1,
      transition: 'all 0.3s ease'
    },
    '.modal-animate-leave.modal-animate-leave-active .modal-container': {
      opacity: 0,
      transform: 'translateY(-130%)'
    },
    '.modal-animate-leave': {
      opacity: 1,
      transition: 'opacity 0.2s ease .2s'
    },
    '.modal-animate-leave.modal-animate-leave-active': {
      opacity: 0
    }
  };

  if(props.isOpen){
    return (
      <CSSTransitionGroup
        transitionName={props.transitionName}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <Style rules={transitions} />
        <div style={modal.base} className="modal">
          <div style={modal.container} className="modal-container" >
            <button style={modal.close} className="close" onClick={props.closeModal}>&#10005;</button>
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
