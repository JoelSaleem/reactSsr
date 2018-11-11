// Bootup location of client-side app
import 'babel-polyfill'; // Define helper functions for babel to user
                         // e.g. allow use of async await syntax (define regeneratorRuntime)
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

// Create our own axios instance so they behave differently on the server and client
// On the server, we need to manually handle the cookie with the req, not necessary here
const axiosInstance = axios.create({
  // This means that this axios instance will prepend /api onto the url
  // to which we are making the request
  baseURL: '/api'
});

axiosInstance.get('/users');

// initialise store with initial state from window.INITIAL_STATE, where
// we placed data from server side store
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
  // pass custom axios instance onto action creators
);

// Render this component to the root div in index.js (server-side bundle)
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </ BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
// Note: we are not replacing the html in there, we are merely telling
//        React to set up the event handlers and bind to that html
// This process is called hydration
