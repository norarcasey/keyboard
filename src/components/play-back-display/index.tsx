import React, { FC, useContext } from 'react';
import { CaptureContext, ICaptureContext } from '../../contexts/capture-context';

export interface IPlayBackDisplay {}

const PlayBackDisplay: FC<IPlayBackDisplay> = props => {
  const captureContext: ICaptureContext = useContext(CaptureContext);

  return (
    <div className="play-back-display">
      {captureContext.playbackNotes.map((pbn, i) => (
        <div key={`note-${pbn.note}-${i}`}>{`Note: ${pbn.note}, Duration: ${pbn.dur}`}</div>
      ))}
    </div>
  );
};

export default PlayBackDisplay;
