import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { uiReducer } from './store/Ui/reducer';

const store = createStore(uiReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider
    store={store}>
    <Router
      basename='/'>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();