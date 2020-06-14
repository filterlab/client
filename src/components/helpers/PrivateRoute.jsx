import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

const PrivateRoute = ({ component: Component, isAuthed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthed ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function mapStateToProps(state) {
  return {
    isAuthed: state.auth.key,
  };
}

export default compose(withRouter, connect(mapStateToProps))(PrivateRoute);
