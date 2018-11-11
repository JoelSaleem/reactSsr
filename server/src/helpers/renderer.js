import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript'; // search data for malicious code (xss, cross site scripting attacks )
// serialize takes special characters (< for tags etc.) and replaces them with their unicode equivalents
// therefore, browser does not try to execute them, but does render them
import Routes from '../client/Routes';


export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </ StaticRouter>
    </ Provider>
  );

  return `
    <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          <!-- Pass in server-side state to window, for client side to use -->
          <!-- use serialize to scrub this data for malicious code (xss attacks) -->
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
