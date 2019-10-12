import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';
import './styles.css';

export interface IKeyProps {
  color?: string;
  style?: object;
  onKeyPress(): void;
  onKeyRelease(): void;
}

const Key: FC<IKeyProps> = props => {
  const { color, onKeyPress, onKeyRelease, style } = props;
  return isMobile ? (
    <div className={`key ${color}`} style={style} onTouchStart={onKeyPress} onTouchEnd={onKeyRelease}></div>
  ) : (
    <div className={`key ${color}`} style={style} onMouseDown={onKeyPress} onMouseUp={onKeyRelease}></div>
  );
};

export default Key;
