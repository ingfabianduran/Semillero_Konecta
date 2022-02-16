import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { uiReducer } from './store/Ui/reducer';

const store = createStore(uiReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <BrowserRouter>
    <Provider
      store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();