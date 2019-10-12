import React, { FC } from 'react';
import './styles.css';

export interface IKeyProps {
  color?: string;
  style?: object;
  onMouseDown(): void;
  onMouseUp(): void;
  onTouchStart(): void;
  onTouchEnd(): void;
}

const Key: FC<IKeyProps> = props => {
  const { color, onMouseDown, onMouseUp, onTouchEnd, onTouchStart, style } = props;
  return (
    <div
      className={`key ${color}`}
      style={style}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
    ></div>
  );
};

export default Key;
