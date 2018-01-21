import React from 'react';
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
      borderRadius: '10px',
      padding: '20px',
      width: '95%',
      maxWidth: '600px',
      background: '#fff',
    },
    closeButton: {
      float: 'right'
    }
  };

  if(props.isOpen){
    return (
      <CSSTransitionGroup
        transitionName={props.transitionName}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
      >
        <div style={modal.base} className="modal">
          <div style={modal.container} className="modal-container" >
            <button style={modal.closeButton} className="close" onClick={props.closeModal}>&#10005;</button>
            {props.children}
          </div>
        </div>
      </CSSTransitionGroup>
    );
  } else {
    return (
      <CSSTransitionGroup
        transitionName={props.transitionName}
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
      </CSSTransitionGroup>
    );
  }
};

export default Modal;
