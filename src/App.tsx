import React from 'react';
import Keyboard from './components/keyboard';
import PlayBackControls from './components/play-back-controls';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Keyboard />
      <PlayBackControls />
    </div>
  );
};

export default App;
