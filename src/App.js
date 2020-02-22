import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import './assets/App.scss';

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Login/Register';
import Homepage from './components/Pages/Home/Homepage';
import Admin from './components/Pages/Admin/Admin';
import AdminRoute from './components/AdminRoute/AdminRoute';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Switch>
          <PrivateRoute exact path="/" component={Homepage} />
          <AdminRoute exact path="/admin" component={Admin} />
        </Switch>
      </Router> 
    </Provider>
  );
}

const RouteWithLayout = ({ component, ...rest }) => {
  return (
    <PrivateRoute {...rest} component={component} />
  );
};

export default App;
