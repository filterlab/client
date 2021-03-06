import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main";
import { Button, Checkbox, Form, Header } from "semantic-ui-react";
import { addAuth } from "../../actions/authActions";
import Page from "../ui/Page";
import { handleSuccess, handleError } from "../helpers/toasts";
import Spacer from "../ui/Spacer";
import InstagramBanner from "../ui/InstagramBanner";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const isEmail = require("isemail");

const SUCCESS_MESSAGE = "Account successfully created, enjoy!";
const FAILURE_MESSAGE_EMAIL_TAKEN =
  "Error, please contact support at filterlabstore@gmail.com";
const FAILURE_MESSAGE_CHECKBOX = "Please enable the checkbox";
const FAILURE_MESSAGE_PASSWORD = "Your password is too short";
const FAILURE_MESSAGE_INVALID_EMAIL = "Please type a valid e-mail";

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    checkbox: false,
    loading: false,
    error: "",
  };

  setError = (error) => {
    handleError(error);
    this.setState({
      error,
    });
  };

  accountCreated = (res) => {
    handleSuccess(SUCCESS_MESSAGE);
    this.setState({ loading: false });
    this.props.addAuth(res.jwt, res.user.id, res.user.email);
    setTimeout(() => this.props.history.push("/success"), 1000);
  };

  accountCreationFailed = () => {
    handleError(FAILURE_MESSAGE_EMAIL_TAKEN);
    this.setState({
      loading: false,
      error: FAILURE_MESSAGE_EMAIL_TAKEN,
    });
  };

  auth = async () => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    await strapi
      .register(email, email, password)
      .then((res) => this.accountCreated(res))
      .catch(() => this.accountCreationFailed());
  };

  validateForm = () => {
    const { email, password, checkbox } = this.state;

    if (!checkbox) {
      this.setError(FAILURE_MESSAGE_CHECKBOX);
    } else if (password.length < 6) {
      this.setError(FAILURE_MESSAGE_PASSWORD);
    } else if (!isEmail.validate(email)) {
      this.setError(FAILURE_MESSAGE_INVALID_EMAIL);
    } else {
      this.auth();
    }
  };

  build = () => (
    <div style={{ width: this.props.isTablet ? 300 : 500 }}>
      <center>
        <Header as="h2">
          Sign up{" "}
          <span
            role="img"
            aria-label="celebrate"
            style={{ fontFamily: "Segoe UI Emoji" }}
          >
            🥳
          </span>
        </Header>
      </center>
      <Spacer space={20} />
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
        <Form.Field>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              onClick={() =>
                this.setState({ checkbox: !this.state.checkbox, error: "" })
              }
            />
            <div style={{ margin: 5 }} />
            <Link
              to="/terms"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              I agree to the Terms and Conditions
            </Link>
          </div>
        </Form.Field>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            loading={this.state.loading}
            disabled={this.state.error}
            onClick={() => this.validateForm()}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
      <Spacer space={30} />
      <InstagramBanner />
      <Spacer space={30} />
    </div>
  );

  render() {
    return (
      <Page
        header={"What are you waiting for?"}
        loading={false}
        loadingMessage={"Redirecting to sign up page"}
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
)(Signup);
