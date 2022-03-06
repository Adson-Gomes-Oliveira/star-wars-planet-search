import React from 'react';
import ControlPanel from './components/ControlPanel';
import Header from './components/Header';
import JediProvider from './context/JediProvider';
import Home from './pages/Home';

function App() {
  return (
    <JediProvider>
      <Header />
      <ControlPanel />
      <Home />
    </JediProvider>
  );
}

export default App;
