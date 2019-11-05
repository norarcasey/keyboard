import React, { createContext, FC, useRef } from 'react';

export interface IOctaveProviderProps {}
export interface IOctaveContext {
  formatKeyOctave: (key: string, index: number) => string;
  octave: number;
  setOctave: (newOctave: number) => void;
}
export const OctaveContext = createContext({} as IOctaveContext);

export const OctaveProvider: FC<IOctaveProviderProps> = props => {
  const octave = useRef(4);

  const setOctave = (newOctave: number) => {
    octave.current = newOctave;
  };

  const formatKeyOctave = (key: string, index: number) => {
    return `${key}${octave.current + Math.floor(index / 12)}`;
  };

  return <OctaveContext.Provider value={{ formatKeyOctave, octave: octave.current, setOctave }}>{props.children}</OctaveContext.Provider>;
};
