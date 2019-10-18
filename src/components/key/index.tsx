import React, { FC, useContext, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { CaptureContext, ICaptureContext, IPlaybackNote } from '../../contexts/capture-context';
// @ts-ignore
import Tone from 'tone';
import './styles.css';

export interface IKeyProps {
  note: string;
  keyboardKey: string;
  color?: string;
  style?: object;
}

const Key: FC<IKeyProps> = props => {
  const captureContext: ICaptureContext = useContext(CaptureContext);
  const [keyPressedDateTime, setKeyPressDateTime] = useState();
  const [synth] = useState(new Tone.Synth().toMaster());
  const { color, keyboardKey, note, style } = props;

  const handleKeyPress = () => {
    synth.triggerAttack(note);

    const now = new Date().getTime();
    setKeyPressDateTime(now);
  };

  const handleKeyRelease = () => {
    synth.triggerRelease();

    const dur = calculateDuration();
    captureContext.captureNote({ note, dur } as IPlaybackNote);
  };

  const calculateDuration = () => {
    return Tone.Time((new Date().getTime() - keyPressedDateTime) / 1000).toNotation();
  };

  return isMobile ? (
    <div className={`key ${color}`} style={style} onTouchStart={handleKeyPress} onTouchEnd={handleKeyRelease}>
      <div className="note-name">
        {note}({keyboardKey})
      </div>
    </div>
  ) : (
    <div className={`key ${color}`} style={style} onMouseDown={handleKeyPress} onMouseUp={handleKeyRelease}>
      <div className="note-name">
        {note}({keyboardKey})
      </div>
    </div>
  );
};

export default Key;
