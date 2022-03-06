import React from 'react';
import JediProvider from './context/JediProvider';
import Home from './pages/Home';

function App() {
  return (
    <JediProvider>
      <Home />
    </JediProvider>
  );
}

export default App;
