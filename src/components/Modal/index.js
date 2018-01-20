import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import './Modal.css';

const Modal = (props) => {

  if(props.isOpen){
    return (
      <CSSTransitionGroup
        transitionName={props.transitionName}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div className="modal">
          <div className="modal-container" >
            <button className="close" onClick={props.closeModal}>&#10005;</button>
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
