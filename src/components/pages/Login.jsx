import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import { addAuth } from "../../actions/authActions";
import { Button, Label, Form } from "semantic-ui-react";
import Page from "../ui/Page";
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const isEmail = require("isemail");

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  auth = async () => {
    const { email, password } = this.state;

    try {
      this.setState({ loading: true });
      const response = await strapi.login(email, password);
      this.setState(
        { loading: false },
        this.props.addAuth(response.jwt, response.user.id, response.user.email)
      );
      this.props.history.push("/");
    } catch (err) {
      this.setState({ loading: false, error: "Something went wrong" });
    }
  };

  validateForm = () => {
    const { email, password } = this.state;

    if (password.length < 6)
      this.setState({ error: "Your password is too short" });
    else if (!isEmail.validate(email))
      this.setState({ error: "Please type a valid e-mail" });
    else {
      this.auth();
    }
  };

  build = () => (
    <div style={{ width: this.props.isTablet ? 300 : 500 }}>
      <Form>
        <Form.Field>
          <label>E-mail</label>
          <input
            onChange={(e) =>
              this.setState({ email: e.target.value, error: "" })
            }
            placeholder="E-mail"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            onChange={(e) =>
              this.setState({ password: e.target.value, error: "" })
            }
            placeholder="Password"
            type="password"
          />
        </Form.Field>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              disabled={this.state.error}
              onClick={() => this.validateForm()}
              type="submit"
            >
              Login
            </Button>
            <Button
              onClick={() => this.props.history.push("/forgot")}
              type="submit"
            >
              Forgot password?
            </Button>
            {this.state.error && (
              <Label basic color="red" pointing="left">
                {this.state.error}
              </Label>
            )}
          </div>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/signup"
          >
            <Button style={{ margin: 0 }}>Register</Button>
          </Link>
        </div>
      </Form>
    </div>
  );

  render() {
    return (
      <Page
        header={"Login"}
        loading={false}
        loadingMessage={"Redirecting to login page"}
        body={this.build()}
        footer
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
const mapDispatchToProps = (dispatch) => {
  return {
    addAuth: (key, accountId, email) => {
      dispatch(addAuth(key, accountId, email));
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
