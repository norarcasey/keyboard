import React, { FC, useContext, useEffect, useReducer } from 'react';
import { CaptureContext, ICaptureContext, IPlaybackNote } from '../../contexts/capture-context';
import reducer, { ActionName, Payload } from './reducer';
import Key from '../key';
import './styles.css';

// @ts-ignore
import get from 'lodash/get';
// @ts-ignore
import Tone from 'tone';

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

export enum KeyboardMap {
  'a' = 'C4',
  'w' = 'C#4',
  's' = 'D4',
  'e' = 'Eb4',
  'd' = 'E4',
  'f' = 'F4',
  't' = 'F#4',
  'g' = 'G4',
  'y' = 'G#4',
  'h' = 'A4',
  'u' = 'Bb4',
  'j' = 'B4',
  'k' = 'C5',
  'i' = 'C#5',
  'l' = 'D5',
  'o' = 'Eb5',
  ';' = 'E5'
}

const Keyboard: FC<IKeyboardProps> = props => {
  const captureContext: ICaptureContext = useContext(CaptureContext);
  const [keysPressed, dispatch] = useReducer(reducer, {});

  const keys: IKey[] = [
    { key: 'C4', keyboardKey: 'a' },
    { key: 'C#4', keyboardKey: 'w', color: 'black', style: { left: '65px' } },
    { key: 'D4', keyboardKey: 's' },
    { key: 'Eb4', keyboardKey: 'e', color: 'black', style: { left: '200px' } },
    { key: 'E4', keyboardKey: 'd' },
    { key: 'F4', keyboardKey: 'f' },
    { key: 'F#4', keyboardKey: 't', color: 'black', style: { left: '432px' } },
    { key: 'G4', keyboardKey: 'g' },
    { key: 'G#4', keyboardKey: 'y', color: 'black', style: { left: '551px' } },
    { key: 'A4', keyboardKey: 'h' },
    { key: 'Bb4', keyboardKey: 'u', color: 'black', style: { left: '674px' } },
    { key: 'B4', keyboardKey: 'j' },
    { key: 'C5', keyboardKey: 'k' },
    { key: 'C#5', keyboardKey: 'i', color: 'black', style: { left: '909px' } },
    { key: 'D5', keyboardKey: 'l' },
    { key: 'Eb5', keyboardKey: 'o', color: 'black', style: { left: '1030px' } },
    { key: 'E5', keyboardKey: ';' }
  ];

  useEffect(() => {
    const handleKeyDown = (keyPressed: string) => {
      const note = (KeyboardMap as any)[keyPressed];

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
      const note = (KeyboardMap as any)[keyPressed];

      if (note && get((keysPressed as any)[keyPressed], 'isPressed', false)) {
        const kpObj: IKeyPressed = (keysPressed as any)[keyPressed];

        kpObj.synth.triggerRelease();
        kpObj.isPressed = false;

        const note = (KeyboardMap as any)[keyPressed];
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
  }, [captureContext, keysPressed]);

  return (
    <div className="keyboard">
      {keys.map(k => (
        <Key key={k.key} note={k.key} keyboardKey={k.keyboardKey} color={k.color} style={k.style}></Key>
      ))}
    </div>
  );
};

export default Keyboard;
