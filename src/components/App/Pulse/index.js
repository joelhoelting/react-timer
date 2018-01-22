import React from 'react';
import Radium from 'radium';

const Pulse = (props) => {
  var pulseKeyframes = Radium.keyframes({
    '0%': {width: '50%'},
    '50%': {width: '100%'},
    '100%': {width: '50%'},
  }, 'pulse');

  var styles = {
    inner: {
      // Use a placeholder animation name in `animation`
      animation: 'x 1s ease 0s infinite',
      // Assign the result of `keyframes` to `animationName`
      animationName: pulseKeyframes,
      background: '#274060',
      height: '1vh',
      margin: '0 auto',
    }
  };

  const { activeTimer } = props;

  if (activeTimer) {
    return (
      <div>
        <div style={styles.inner} />
      </div>
    );
  } else {
    return null;
  }

};

export default Radium(Pulse);
