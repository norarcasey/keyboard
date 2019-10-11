import React, { FC } from 'react';
import Key from '../key';
// @ts-ignore
import Tone from 'tone';
import './styles.css';

export interface IKeyboardProps {}

const Keyboard: FC<IKeyboardProps> = props => {
  const synth = new Tone.Synth().toMaster();

  const handleKeyClick = (key: string) => {
    synth.triggerAttackRelease(key, '8n');
  };

  return (
    <div className="keyboard">
      <Key onClick={() => handleKeyClick('C4')}></Key>
      <Key color="black" style={{ position: 'absolute', left: '65px' }} onClick={() => handleKeyClick('C#4')}></Key>
      <Key onClick={() => handleKeyClick('D4')}></Key>
      <Key color="black" style={{ position: 'absolute', left: '200px' }} onClick={() => handleKeyClick('Eb4')}></Key>
      <Key onClick={() => handleKeyClick('E4')}></Key>
      <Key onClick={() => handleKeyClick('F4')}></Key>
      <Key color="black" style={{ position: 'absolute', left: '440px' }} onClick={() => handleKeyClick('F#4')}></Key>
      <Key onClick={() => handleKeyClick('G4')}></Key>
      <Key color="black" style={{ position: 'absolute', left: '570px' }} onClick={() => handleKeyClick('G#4')}></Key>
      <Key onClick={() => handleKeyClick('A4')}></Key>
      <Key color="black" style={{ position: 'absolute', left: '700px' }} onClick={() => handleKeyClick('Bb4')}></Key>
      <Key onClick={() => handleKeyClick('B4')}></Key>
      <Key onClick={() => handleKeyClick('C5')}></Key>
    </div>
  );
};

export default Keyboard;
