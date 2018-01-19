import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import './Modal.css';

const Modal = (props) => {

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
    closeButton: {
      float: 'right'
    }
  };

  const { modal, modalContainer, closeButton } = styles;

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
            {props.children}
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

export default Modal;
