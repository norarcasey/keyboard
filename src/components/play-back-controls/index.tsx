import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCircle, faStop } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import Tone from 'tone';
import Playback from './playback';
import './styles.css';

export interface IPlayBackControls {}

const PlayBackControls: FC<IPlayBackControls> = props => {
  const [isPlaying, setIsPlaying] = useState(false);

  var synth = new Tone.Synth().toMaster();

  //pass in an array of events
  var part = new Tone.Part(function(time: any, event: any) {
    //the events will be given to the callback with the time they occur
    synth.triggerAttackRelease(event.note, event.dur, time);
  }, Playback);

  //start the part at the beginning of the Transport's timeline
  part.start(0);

  //loop the part 3 times
  part.loop = 1;
  part.loopEnd = '4m';

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    Tone.Transport.toggle();
  };

  return (
    <div className="controls">
      <div className="play" onClick={handlePlayClick}>
        {isPlaying ? <FontAwesomeIcon size="lg" icon={faStop} /> : <FontAwesomeIcon size="lg" icon={faPlay} />}
      </div>
      <div className="record">
        <FontAwesomeIcon size="lg" color="red" icon={faCircle} />
      </div>
    </div>
  );
};

export default PlayBackControls;
