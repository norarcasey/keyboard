import React, { FC } from 'react';
import './styles.css';

export interface IKeyProps {
  color?: string;
  style?: object;
  onMouseDown(): void;
  onMouseUp(): void;
}

const Key: FC<IKeyProps> = props => {
  return <div className={`key ${props.color}`} style={props.style} onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp}></div>;
};

export default Key;
