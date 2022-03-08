import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import JediProvider from './context/JediProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <JediProvider>
    <App />
  </JediProvider>,
  document.getElementById('root'),
);
