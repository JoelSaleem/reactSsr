// Native Node imports
// const express = require('express');
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/home').default; // access default export

// Because we are running webpack and babel over our server code, we can Because
// newer import statements, no need for the imports above
import 'babel-polyfill'; // Define helper functions for babel to user
                         // e.g. allow use of async await syntax (define regeneratorRuntime)
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

// If any req comes in that starts with the route '/api', then we want to proxy
// the request
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  // THIS SECOND ARG TO PROXY() IS ONLY NEEDED FOR THIS COURSE
  // DO NOT INCLUDE IN OTHER APPLICATIONS
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000';
    return opts;
  }
}));

// Treat public directory as a static (available to outside world)
// Express will automatically look for a bundle.js file, see below
app.use(express.static('public'));

app.get('*', (req, res) => {
  // create redux store, pass in req so we can rip the cookie off
  const store = createStore(req);

  // req.path is the path that the user is attempting to view.
  // matchRoutes looks at the path and returns an array of components that are
  // about to be rendered .
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    // If the route has a loadData function (for redux store), call it
    return route.loadData ? route.loadData(store) : null;
  });

  // Combine Promises into one single promise that is resolved when all promises
  // in original promise array are resolved
  Promise.all(promises).then(() => {
    // render app
    res.send(renderer(req, store));
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
