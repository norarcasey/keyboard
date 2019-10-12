import React, { FC } from 'react';
import Key from '../key';
// @ts-ignore
import Tone from 'tone';
import './styles.css';

export interface IKeyboardProps {}
export interface IKey {
  key: string;
  color?: string;
  style?: object;
}

const Keyboard: FC<IKeyboardProps> = props => {
  const synth = new Tone.Synth().toMaster();

  const handleKeyPress = (key: string) => {
    synth.triggerAttack(key);
  };

  const handleKeyRelease = () => {
    synth.triggerRelease();
  };

  const keys: IKey[] = [
    { key: 'C4' },
    { key: 'C#4', color: 'black', style: { left: '65px' } },
    { key: 'D4' },
    { key: 'Eb4', color: 'black', style: { left: '200px' } },
    { key: 'E4' },
    { key: 'F4' },
    { key: 'F#4', color: 'black', style: { left: '432px' } },
    { key: 'G4' },
    { key: 'G#4', color: 'black', style: { left: '551px' } },
    { key: 'A4' },
    { key: 'Bb4', color: 'black', style: { left: '674px' } },
    { key: 'B4' },
    { key: 'C5' },
    { key: 'C#5', color: 'black', style: { left: '909px' } },
    { key: 'D5' },
    { key: 'Eb5', color: 'black', style: { left: '1030px' } },
    { key: 'E5' }
  ];

  return (
    <div className="keyboard">
      {keys.map(k => (
        <Key key={k.key} color={k.color} style={k.style} onKeyPress={() => handleKeyPress(k.key)} onKeyRelease={handleKeyRelease}></Key>
      ))}
    </div>
  );
};

export default Keyboard;
