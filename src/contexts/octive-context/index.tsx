import React, { createContext, FC, useRef } from 'react';

export interface IOctiveProviderProps {}
export interface IOctiveContext {
  formatKeyOctive: (key: string, index: number) => string;
  octive: number;
  setOctive: (newOctive: number) => void;
}
export const OctiveContext = createContext({} as IOctiveContext);

export const OctiveProvider: FC<IOctiveProviderProps> = props => {
  const octive = useRef(4);

  const setOctive = (newOctive: number) => {
    octive.current = newOctive;
  };

  const formatKeyOctive = (key: string, index: number) => {
    return `${key}${octive.current + Math.floor(index / 12)}`;
  };

  return <OctiveContext.Provider value={{ formatKeyOctive, octive: octive.current, setOctive }}>{props.children}</OctiveContext.Provider>;
};
