import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';
import 'Src/assets/styles/index.scss';

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
