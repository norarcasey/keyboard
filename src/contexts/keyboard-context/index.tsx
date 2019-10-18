import React, { FC, createContext, useEffect, useState } from 'react';
// @ts-ignore
import Tone from 'tone';

export interface IKeyboardContext {}
export interface IKeyboardProviderProps {}

export const KeyboardContext = createContext({} as IKeyboardContext);
export const KeyboardConsumer = KeyboardContext.Consumer;

export enum KeyboardMap {
  'a' = 'C4',
  'w' = 'C#4',
  's' = 'D4',
  'e' = 'Eb4',
  'd' = 'E4',
  'f' = 'F4',
  't' = 'F#4',
  'g' = 'G4',
  'y' = 'G#4',
  'h' = 'A4',
  'u' = 'Bb4',
  'j' = 'B4',
  'k' = 'C5',
  'i' = 'C#5',
  'l' = 'D5',
  'o' = 'Eb5',
  ';' = 'E5'
}

export const KeyboardProvider: FC<IKeyboardProviderProps> = props => {
  const keysPressed = {};

  useEffect(() => {
    document.addEventListener(
      'keydown',
      (e: any) => {
        const keyPressed: string = e.key.toString();
        const kpObj = (keysPressed as any)[keyPressed] || { synth: new Tone.Synth().toMaster() };

        if (!kpObj.isPressed) {
          kpObj.isPressed = true;
          kpObj.synth.triggerAttack((KeyboardMap as any)[keyPressed], Tone.context.currentTime);
          (keysPressed as any)[keyPressed] = kpObj;
        }
      },
      false
    );

    document.addEventListener(
      'keyup',
      (e: any) => {
        const keyPressed: string = e.key.toString();
        const kpObj = (keysPressed as any)[keyPressed];
        if (kpObj.isPressed) {
          kpObj.synth.triggerRelease();
          kpObj.isPressed = false;
        }
      },
      false
    );
  });

  return <KeyboardContext.Provider value={{}}>{props.children}</KeyboardContext.Provider>;
};
