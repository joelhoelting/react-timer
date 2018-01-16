import React from 'react';

// Import Audio Files
import alarm_clock from './sounds/alarm_clock.mp3';
import applause_cheers from './sounds/applause_cheers.mp3';
import foghorn_barge from './sounds/foghorn_barge.mp3';
import old_bell from './sounds/old_bell.mp3';
import ship_brass from './sounds/ship_brass.mp3';

const AudioFiles = () => {
  // const audioArray = [
  //   alarm_clock,
  //   applause_cheers,
  //   foghorn_barge,
  //   old_bell,
  //   ship_brass
  // ]

  return (
    <div>
      <audio src={alarm_clock} />
      <audio src={applause_cheers} />
      <audio src={foghorn_barge} />
      <audio src={old_bell} />
      <audio src={ship_brass} />
    </div>
  );
};

export default AudioFiles;
