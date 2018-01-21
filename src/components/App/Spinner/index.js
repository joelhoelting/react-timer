import React from 'react';
import Radium from 'radium';

class Spinner extends React.Component {
  render () {
    return (
      <div>
        <div style={styles.inner} />
      </div>
    );
  }
}

export default Radium(Spinner);

var pulseKeyframes = Radium.keyframes({
  '0%': {width: '10%'},
  '50%': {width: '50%'},
  '100%': {width: '10%'},
}, 'pulse');

var styles = {
  inner: {
    // Use a placeholder animation name in `animation`
    animation: 'x 3s ease 0s infinite',
    // Assign the result of `keyframes` to `animationName`
    animationName: pulseKeyframes,
    background: 'blue',
    height: '4px',
    margin: '0 auto',
  }
};
