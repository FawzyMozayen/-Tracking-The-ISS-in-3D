import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LoadingProvider } from './lib/loading';
import {
  BrowserRouter as Router,
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
