import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import "./i18n";
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './app/BackEnd/Firebase';

ReactDOM.render(
  <BrowserRouter basename="/demo/purple-react-free/template/demo_1/preview">
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();