import React, { FC, useContext, useEffect, useState } from 'react';
import { CaptureContext, ICaptureContext } from '../../contexts/capture-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCircle, faStop, faBan } from '@fortawesome/free-solid-svg-icons';
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
  const [lastNote, setLastNote] = useState();
  const [synth] = useState(new Tone.Synth().toMaster());

  useEffect(() => {
    const playbackNotes = captureContext.playbackNotes;

    if (playbackNotes.length > 0) {
      setLastNote(playbackNotes[playbackNotes.length - 1]);
      setPlayback(captureContext.playbackNotes);
    } else {
      setLastNote(AxelF[AxelF.length - 1]);
      setPlayback(AxelF);
    }
  }, [captureContext.playbackNotes]);

  useEffect(() => {
    if (part && part.length > 0) {
      part.start(0);

      Tone.Transport.scheduleOnce(function(time: any) {
        part.removeAll();
        Tone.Transport.toggle();
        setIsPlaying(false);
      }, Tone.Time(lastNote.time).toSeconds() + Tone.Time(lastNote.dur).toSeconds());

      Tone.Transport.toggle();
      setIsPlaying(true);
    }
  }, [part, lastNote]);

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

  const handleClearPlaybackData = () => {
    captureContext.clearCaptureData();
    part.removeAll();
  };

  return (
    <div className="controls">
      <div>
        {isPlaying ? (
          <div onClick={handleStopClick} title="stop">
            <FontAwesomeIcon size="lg" icon={faStop} />
          </div>
        ) : (
          <div onClick={handlePlayClick} title="play">
            <FontAwesomeIcon size="lg" icon={faPlay} />
          </div>
        )}
      </div>
      <div className="record" title="record">
        <FontAwesomeIcon size="lg" color="red" icon={faCircle} />
      </div>
      <div className="clear" title="clear" onClick={handleClearPlaybackData}>
        <FontAwesomeIcon size="lg" icon={faBan} />
      </div>
    </div>
  );
};

export default PlayBackControls;
