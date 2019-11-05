import React from 'react';
import Keyboard from './components/keyboard';
import PlayBackControls from './components/play-back-controls';
import PlaybackDisplay from './components/play-back-display';
import { CaptureProvider } from './contexts/capture-context';
import { OctaveProvider } from './contexts/octave-context';
import OctaveControl from './components/octave-control';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <OctaveProvider>
        <CaptureProvider>
          <Keyboard />
          <div className="playback-container">
            <PlaybackDisplay />
            <PlayBackControls />
            <OctaveControl />
          </div>
        </CaptureProvider>
      </OctaveProvider>
    </div>
  );
};

export default App;
