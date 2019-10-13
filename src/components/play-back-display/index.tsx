import React, { FC, useContext } from 'react';
import { CaptureContext, ICaptureContext } from '../../contexts/capture-context';
import './styles.css';

export interface IPlayBackDisplay {}

const PlayBackDisplay: FC<IPlayBackDisplay> = props => {
  const captureContext: ICaptureContext = useContext(CaptureContext);

  return (
    <div className="play-back-display">
      <div className="header">
        <span className="note-header">Note</span>
        <span className="duration-header">Duration</span>
        <span className="time-header">Time</span>
      </div>

      <div className="container">
        <div className="scroll-container">
          {captureContext.playbackNotes.map((pbn, i) => (
            <div key={`note-${pbn.note}-${i}`} className="data">
              <span className="note-data">{pbn.note}</span>
              <span className="duration-data">{pbn.dur}</span>
              <span className="time-data">{pbn.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayBackDisplay;
