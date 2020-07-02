import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { removeKey } from "../../../actions/authActions";
const Login = (props) =>
  props.isAuthed ? (
    <Link
      to="/"
      onClick={() => props.removeKey(props.isAuthed)}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <Button color="red">Logout</Button>
    </Link>
  ) : (
    <Link to="/login" style={{ color: "inherit", textDecoration: "inherit" }}>
      <Button color="green">Login</Button>
    </Link>
  );

function mapStateToProps(state) {
  return {
    isAuthed: state.auth.key,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeKey: (key) => {
      dispatch(removeKey(key));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
