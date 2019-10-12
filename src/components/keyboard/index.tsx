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

  const handleMouseDown = (key: string) => {
    synth.triggerAttack(key);
  };

  const handleMouseUp = () => {
    synth.triggerRelease();
  };

  const keys: IKey[] = [
    { key: 'C4' },
    { key: 'C#4', color: 'black', style: { left: '65px' } },
    { key: 'D4' },
    { key: 'Eb4', color: 'black', style: { left: '200px' } },
    { key: 'E4' },
    { key: 'F4' },
    { key: 'F#4', color: 'black', style: { left: '440px' } },
    { key: 'G4' },
    { key: 'G#4', color: 'black', style: { left: '570px' } },
    { key: 'A4' },
    { key: 'Bb4', color: 'black', style: { left: '700px' } },
    { key: 'B4' },
    { key: 'C5' }
  ];

  return (
    <div className="keyboard">
      {keys.map(k => (
        <Key
          key={k.key}
          color={k.color}
          style={k.style}
          onTouchStart={() => handleMouseDown(k.key)}
          onTouchEnd={handleMouseUp}
          onMouseDown={() => handleMouseDown(k.key)}
          onMouseUp={handleMouseUp}
        ></Key>
      ))}
    </div>
  );
};

export default Keyboard;
