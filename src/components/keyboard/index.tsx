import React, { FC, useContext, useEffect, useReducer } from 'react';
import { CaptureContext, ICaptureContext, IPlaybackNote } from '../../contexts/capture-context';
import reducer, { ActionName, Payload } from './reducer';
import Key from '../key';
import './styles.css';

// @ts-ignore
import get from 'lodash/get';
// @ts-ignore
import Tone from 'tone';
import { IOctiveContext, OctiveContext } from '../../contexts/octive-context';

export interface IKeyboardProps {}
export interface IKey {
  key: string;
  keyboardKey: string;
  color?: string;
  style?: object;
}

export interface IKeyPressed {
  isPressed?: boolean;
  startTime?: number;
  synth: any;
}

const Keyboard: FC<IKeyboardProps> = props => {
  const captureContext: ICaptureContext = useContext(CaptureContext);
  const octiveContext: IOctiveContext = useContext(OctiveContext);
  const [keysPressed, dispatch] = useReducer(reducer, {});

  const keys: IKey[] = [
    { key: 'C', keyboardKey: 'a' },
    { key: 'C#', keyboardKey: 'w', color: 'black', style: { left: '65px' } },
    { key: 'D', keyboardKey: 's' },
    { key: 'Eb', keyboardKey: 'e', color: 'black', style: { left: '200px' } },
    { key: 'E', keyboardKey: 'd' },
    { key: 'F', keyboardKey: 'f' },
    { key: 'F#', keyboardKey: 't', color: 'black', style: { left: '432px' } },
    { key: 'G', keyboardKey: 'g' },
    { key: 'G#', keyboardKey: 'y', color: 'black', style: { left: '551px' } },
    { key: 'A', keyboardKey: 'h' },
    { key: 'Bb', keyboardKey: 'u', color: 'black', style: { left: '674px' } },
    { key: 'B', keyboardKey: 'j' },
    { key: 'C', keyboardKey: 'k' },
    { key: 'C#', keyboardKey: 'i', color: 'black', style: { left: '909px' } },
    { key: 'D', keyboardKey: 'l' },
    { key: 'Eb', keyboardKey: 'o', color: 'black', style: { left: '1030px' } },
    { key: 'E', keyboardKey: ';' }
  ];

  useEffect(() => {
    const noteLookup = (keyPressed: string) => {
      const key = keys.find(key => {
        if (key.keyboardKey === keyPressed) {
          return key;
        } else {
          return null;
        }
      });

      if (key) {
        return octiveContext.formatKeyOctive(key.key, keys.indexOf(key));
      }

      return null;
    };

    const handleKeyDown = (keyPressed: string) => {
      const note = noteLookup(keyPressed);

      if (note && !get((keysPressed as any)[keyPressed], 'isPressed', false)) {
        const kpObj: IKeyPressed = (keysPressed as any)[keyPressed] || {};
        kpObj.isPressed = true;
        kpObj.synth = kpObj.synth || new Tone.Synth().toMaster();
        kpObj.startTime = new Date().getTime();
        kpObj.synth.triggerAttack(note);
        dispatch({ type: ActionName.OverwriteKeyPressData, payload: { keyPressed, keyData: kpObj } as Payload });
      }
    };

    const handleKeyUp = (keyPressed: string) => {
      const note = noteLookup(keyPressed);

      if (note && get((keysPressed as any)[keyPressed], 'isPressed', false)) {
        const kpObj: IKeyPressed = (keysPressed as any)[keyPressed];

        kpObj.synth.triggerRelease();
        kpObj.isPressed = false;

        const dur = captureContext.calculateDuration(kpObj.startTime);
        const playbackNote: IPlaybackNote = { note, dur };
        captureContext.captureNote(playbackNote);
      }
    };

    const keyDown = (e: any) => handleKeyDown(e.key.toString());
    document.addEventListener('keydown', keyDown, false);

    const keyUpFunc = (e: any) => handleKeyUp(e.key.toString());
    document.addEventListener('keyup', keyUpFunc, false);

    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUpFunc);
    };
  }, [captureContext, keysPressed, octiveContext, keys]);

  return (
    <div className="keyboard">
      {keys.map((k, i) => (
        <Key
          key={`${k.key}${i}`}
          octive={octiveContext.octive}
          note={octiveContext.formatKeyOctive(k.key, i)}
          keyboardKey={k.keyboardKey}
          color={k.color}
          style={k.style}
        ></Key>
      ))}
    </div>
  );
};

export default Keyboard;
