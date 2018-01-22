import React from 'react';
import Radium from 'radium';

const Pulse = () => {
  var pulseKeyframes = Radium.keyframes({
    '0%': {width: '10%'},
    '50%': {width: '80%'},
    '100%': {width: '10%'},
  }, 'pulse');

  var styles = {
    inner: {
      // Use a placeholder animation name in `animation`
      animation: 'x 1s ease 0s infinite',
      // Assign the result of `keyframes` to `animationName`
      animationName: pulseKeyframes,
      background: '#274060',
      borderRadius: '5px',
      height: '5px',
      margin: '0 auto',
    }
  };

  return (
    <div>
      <div style={styles.inner} />
    </div>
  );
};

export default Radium(Pulse);
