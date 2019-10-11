import React, { FC } from 'react';
import './styles.css';

export interface IKeyProps {
  color?: string;
  style?: object;
  onClick(): void;
}

const Key: FC<IKeyProps> = props => {
  return <div className={`key ${props.color}`} style={props.style} onClick={props.onClick}></div>;
};

export default Key;
