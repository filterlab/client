import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Page from "../Page";
import { Button } from "semantic-ui-react";

class Page404 extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  build = () => (
    <div
      style={{
        width: this.props.isTablet ? 300 : 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Something went wrong, go back to <div style={{ marginLeft: 5 }} />
      <Link to={"/"} style={{ color: "inherit", textDecoration: "inherit" }}>
        <Button>Home</Button>
      </Link>
    </div>
  );

  render() {
    return (
      <Page
        header={"Page 404"}
        loading={false}
        loadingMessage={""}
        body={this.build()}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    isTablet: state.responsive.isTablet,
    isAuthed: state.auth.key,
  };
}

export default compose(withRouter, connect(mapStateToProps, null))(Page404);
