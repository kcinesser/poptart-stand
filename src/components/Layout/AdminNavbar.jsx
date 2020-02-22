import React, { Component } from 'react';
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AdminNavbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div className="nav">
        <div className="nav__inner">
          <h1>Poptart Stand Admin</h1>
          <button className="button button--user" onClick={this.onLogoutClick}></button>
        </div>
      </div>
    )
  }
}

AdminNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AdminNavbar);