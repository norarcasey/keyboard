import React, { createContext, FC, useState } from 'react';
// @ts-ignore
import Tone from 'tone';

export interface ICaptureContext {
  captureStartTime: number;
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
  const [playbackNotes, setPlaybackNotes] = useState([] as IPlaybackNote[]);
  const [captureStartTime, setCaptureStartTime] = useState(0);

  const handleCaptureNote = (playbackNote: IPlaybackNote) => {
    const now = new Date().getTime() / 1000;
    if (playbackNotes.length === 0) {
      setCaptureStartTime(now);
      playbackNote.time = Tone.Time(0).toBarsBeatsSixteenths();
    } else {
      playbackNote.time = Tone.Time(now - captureStartTime).toBarsBeatsSixteenths();
    }

    setPlaybackNotes([...playbackNotes, playbackNote]);
  };

  const clearCaptureData = () => {
    setPlaybackNotes([]);
  };

  return (
    <CaptureContext.Provider value={{ captureNote: handleCaptureNote, captureStartTime, clearCaptureData, playbackNotes }}>
      {props.children}
    </CaptureContext.Provider>
  );
};
