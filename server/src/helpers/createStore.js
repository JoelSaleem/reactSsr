import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

export default req => {
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie') || '' } // set cookie from the req obj
    // default value to empty string rather than undefined
  });

  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  return(store);
}

/*
  Note: we are not creating the store and passing our whole server-side appliction
  into a <Provider store={}> ... </ Provider> in the renderer, because we want to
  create the store and load data into here before even rendering. This is therefore
  done inside the index.js file
*/
