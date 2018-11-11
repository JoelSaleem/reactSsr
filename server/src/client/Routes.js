import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';

// This is how to do routing for react-router-config for ssr
export default [
  {
    ...App, // No path is specified for this route, meaning it will always be displayed
    // The routes specified below will be passed into the app as children
    routes: [ // Note: these are nested routes inside the app component
      {
        ...HomePage, // first element component: homepage
        path: '/',
        exact: true
      },
      {
        ...UsersListPage, // component: UsersListPage, loadData: loadData
        path:'/users',
      }
    ]
  }
];
