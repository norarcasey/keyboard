import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCircle, faStop } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import Tone from 'tone';
import './styles.css';

export interface IPlayBackControls {}

const PlayBackControls: FC<IPlayBackControls> = props => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playBack = [
    // 1st Measure
    {
      time: Tone.Time('0:0:0'),
      note: 'D3',
      dur: '4n'
    },
    {
      time: Tone.Time('0:1:0'),
      note: 'F3',
      dur: '8n.'
    },
    {
      time: Tone.Time('0:1:3'),
      note: 'D3',
      dur: '8n'
    },
    {
      time: Tone.Time('0:2:1'),
      note: 'D3',
      dur: '16n'
    },
    {
      time: Tone.Time('0:2:2'),
      note: 'G3',
      dur: '8n'
    },
    {
      time: Tone.Time('0:3:0'),
      note: 'D3',
      dur: '8n'
    },
    {
      time: Tone.Time('0:3:2'),
      note: 'C3',
      dur: '8n'
    },
    // 2nd Measure
    {
      time: Tone.Time('1:0:0'),
      note: 'D3',
      dur: '4n'
    },
    {
      time: Tone.Time('1:1:0'),
      note: 'A3',
      dur: '8n.'
    },
    {
      time: Tone.Time('1:1:3'),
      note: 'D3',
      dur: '8n'
    },
    {
      time: Tone.Time('1:2:1'),
      note: 'D3',
      dur: '16n'
    },
    {
      time: Tone.Time('1:2:2'),
      note: 'Bb3',
      dur: '8n'
    },
    {
      time: Tone.Time('1:3:0'),
      note: 'A3',
      dur: '8n'
    },
    {
      time: Tone.Time('1:3:2'),
      note: 'F3',
      dur: '8n'
    },
    // 3rd Measure
    {
      time: Tone.Time('2:0:0'),
      note: 'D3',
      dur: '8n'
    },
    {
      time: Tone.Time('2:0:2'),
      note: 'A3',
      dur: '8n'
    },
    {
      time: Tone.Time('2:1:0'),
      note: 'D4',
      dur: '8n'
    },
    {
      time: Tone.Time('2:1:2'),
      note: 'D3',
      dur: '16n'
    },
    {
      time: Tone.Time('2:1:3'),
      note: 'C3',
      dur: '8n'
    },
    {
      time: Tone.Time('2:2:1'),
      note: 'C3',
      dur: '16n'
    },
    {
      time: Tone.Time('2:2:2'),
      note: 'A2',
      dur: '8n'
    },
    {
      time: Tone.Time('2:3:0'),
      note: 'E3',
      dur: '8n'
    },
    {
      time: Tone.Time('2:3:2'),
      note: 'D3',
      dur: '8n'
    }
  ];
  var synth = new Tone.Synth().toMaster();

  //pass in an array of events
  var part = new Tone.Part(function(time: any, event: any) {
    //the events will be given to the callback with the time they occur
    synth.triggerAttackRelease(event.note, event.dur, time);
  }, playBack);

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
