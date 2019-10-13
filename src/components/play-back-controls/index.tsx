import React, { FC, useContext, useEffect, useState } from 'react';
import { CaptureContext, ICaptureContext } from '../../contexts/capture-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCircle, faStop } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import Tone from 'tone';
import AxelF from './axel-f';
import './styles.css';

export interface IPlayBackControls {}

const PlayBackControls: FC<IPlayBackControls> = props => {
  const captureContext: ICaptureContext = useContext(CaptureContext);
  const [isPlaying, setIsPlaying] = useState();
  const [part, setPart] = useState();
  const [playback, setPlayback] = useState(AxelF as any);
  const [synth] = useState(new Tone.Synth().toMaster());

  useEffect(() => {
    if (captureContext.playbackNotes.length > 0) {
      setPlayback(captureContext.playbackNotes);
    }
  }, [captureContext.playbackNotes]);

  useEffect(() => {
    if (part && part.length > 0) {
      part.start(0);
      const lastNote = playback[playback.length - 1];

      Tone.Transport.schedule(function(time: any) {
        part.removeAll();
        Tone.Transport.toggle();
        setIsPlaying(false);
      }, Tone.Time(lastNote.time).toSeconds() + Tone.Time(lastNote.dur).toSeconds());

      Tone.Transport.toggle();
      setIsPlaying(true);
    }
  }, [part]);

  const handlePlayClick = () => {
    setPart(
      new Tone.Part(function(time: any, event: any) {
        synth.triggerAttackRelease(event.note, event.dur, time);
      }, playback)
    );
  };

  const handleStopClick = () => {
    part.removeAll();
    Tone.Transport.toggle();
    setIsPlaying(false);
  };

  return (
    <div className="controls">
      <div>
        {isPlaying ? (
          <div onClick={handleStopClick}>
            <FontAwesomeIcon size="lg" icon={faStop} />
          </div>
        ) : (
          <div onClick={handlePlayClick}>
            <FontAwesomeIcon size="lg" icon={faPlay} />
          </div>
        )}
      </div>
      <div className="record">
        <FontAwesomeIcon size="lg" color="red" icon={faCircle} />
      </div>
    </div>
  );
};

export default PlayBackControls;
