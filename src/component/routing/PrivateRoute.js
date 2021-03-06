import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={ props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {};
const mapStatetoProp = (state) => ({
  auth: state.auth
});
export default connect(mapStatetoProp)(PrivateRoute);
