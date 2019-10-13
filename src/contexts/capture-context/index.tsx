import React, { createContext, FC, useState } from 'react';

export interface ICaptureContext {
  playbackNotes: IPlaybackNote[];
  captureNote(playbackNote: IPlaybackNote): void;
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

  const handleCaptureNote = (playbackNote: IPlaybackNote) => {
    console.log({ playbackNote });
    setPlaybackNotes([...playbackNotes, playbackNote]);
  };

  return <CaptureContext.Provider value={{ captureNote: handleCaptureNote, playbackNotes }}>{props.children}</CaptureContext.Provider>;
};
