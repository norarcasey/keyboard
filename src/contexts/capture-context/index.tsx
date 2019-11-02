import React, { createContext, FC, useCallback, useEffect, useReducer, useRef } from 'react';
import reducer, { ActionName } from './reducer';
// @ts-ignore
import Tone from 'tone';

export interface ICaptureContext {
  captureStartTime: number;
  calculateDuration: any;
  calculateTime: any;
  playbackNotes: IPlaybackNote[];
  captureNote(playbackNote: IPlaybackNote): void;
  clearCaptureData(): void;
}
export interface ICaptureProviderProps {}
export interface IPlaybackNote {
  dur?: string;
  note: string;
  time?: any;
}

export const CaptureContext = createContext({} as ICaptureContext);
export const CaptureConsumer = CaptureContext.Consumer;

export const CaptureProvider: FC<ICaptureProviderProps> = props => {
  // useRef because eventhandlers
  // https://stackoverflow.com/questions/53845595/wrong-react-hooks-behaviour-with-event-listener
  const captureStartTime = useRef(0);
  const [playbackNotes, dispatch] = useReducer(reducer, []);

  const handleCaptureNote = useCallback(
    (playbackNote: IPlaybackNote) => {
      const now = new Date().getTime() / 1000;
      if (captureStartTime.current === 0) {
        captureStartTime.current = now;
      }
      playbackNote.time = calculateTimeDiff(now).toBarsBeatsSixteenths();

      dispatch({ type: ActionName.AddPlaybackNote, payload: playbackNote });
    },
    [captureStartTime]
  );

  useEffect(() => {
    if (playbackNotes.length === 1) {
      const now = new Date().getTime() / 1000;
      captureStartTime.current = now;
    }
  }, [playbackNotes]);

  const calculateTimeDiff = (timeToDiff: number) => {
    return Tone.Time(timeToDiff - captureStartTime.current);
  };

  const clearCaptureData = () => {
    dispatch({ type: ActionName.ClearPlaybackNotes, payload: [] });
  };

  const calculateDuration = (keyPressedDateTime: number) => {
    return Tone.Time((new Date().getTime() - keyPressedDateTime) / 1000).toNotation();
  };

  const calculateTime = (keyPressedDateTime: number) => {
    return Tone.Time(keyPressedDateTime - captureStartTime.current).toBarsBeatsSixteenths();
  };

  return (
    <CaptureContext.Provider
      value={{
        captureNote: handleCaptureNote,
        calculateDuration,
        calculateTime,
        captureStartTime: captureStartTime.current,
        clearCaptureData,
        playbackNotes
      }}
    >
      {props.children}
    </CaptureContext.Provider>
  );
};
