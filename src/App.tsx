import React from 'react';
import Keyboard from './components/keyboard';
import PlayBackControls from './components/play-back-controls';
import PlaybackDisplay from './components/play-back-display';
import { CaptureProvider } from './contexts/capture-context';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <CaptureProvider>
        <Keyboard />
        <PlayBackControls />
        <PlaybackDisplay />
      </CaptureProvider>
    </div>
  );
};

export default App;
