import React, { FC } from 'react';
import Key from '../key';
import './styles.css';

export interface IKeyboardProps {}
export interface IKey {
  key: string;
  keyboardKey: string;
  color?: string;
  style?: object;
}

const Keyboard: FC<IKeyboardProps> = props => {
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

  return (
    <div className="keyboard">
      {keys.map(k => (
        <Key key={k.key} note={k.key} keyboardKey={k.keyboardKey} color={k.color} style={k.style}></Key>
      ))}
    </div>
  );
};

export default Keyboard;
