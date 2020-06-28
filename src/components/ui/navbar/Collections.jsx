import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Collections = (props) =>
  props.isAuthed ? (
    <Link
      to="/collections"
      style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
    >
      <Icon name="download" size="big" color="grey" />
    </Link>
  ) : (
    <Link
      to="/collections_login"
      style={{ color: "inherit", textDecoration: "inherit", margin: 1 }}
    >
      <Icon name="download" size="big" color="grey" />
    </Link>
  );

function mapStateToProps(state) {
  return {
    isAuthed: state.auth.key,
  };
}

export default connect(mapStateToProps)(Collections);
