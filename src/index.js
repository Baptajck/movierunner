import React from 'react';
import { render } from 'react-dom';
import './styles/reset.scss';
import './styles/index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';

// == Render
const rootComponent = (
  <Router basename="/">
    <App />
  </Router>
);

// Le rendu de React => DOM
render(rootComponent, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
