import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AdminNavbar from '../Layout/AdminNavbar';

const AdminRoute = ({ component: Component, auth, text, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true && auth.user.role === 0 ? (
        <div>
          <AdminNavbar />
          <div className="main-content">
            <Component {...props} />
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);